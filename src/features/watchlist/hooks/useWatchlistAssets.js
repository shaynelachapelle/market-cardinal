import { useEffect, useState } from "react";
import { supabase } from "../../../app/supabase-client";
import { useWatchlistContext } from "../stores/WatchlistContext";

export default function useWatchlistAssets(userId, watchlistId) {
  const { watchlistAssets, setWatchlistAssets } = useWatchlistContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    /*
    Fetch all user watchlist assets at once to eliminate loading between selection
    of watchlists, improving smoothness of navigation
    */
    if (!userId) return;

    let cancelled = false;

    async function fetchAssets() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("watchlist_assets")
          .select(
            `
            id,
            asset_symbol,
            watchlist_id,
            prices (
              symbol,
              name,
              asset_type,
              price,
              percent_change,
              volume,
              change,
              status
            )
          `
          )
          .eq("profile_id", userId);

        if (error) throw error;

        if (!cancelled) {
          // group assets by watchlistId
          const grouped = data.reduce((acc, asset) => {
            acc[asset.watchlist_id] = [
              ...(acc[asset.watchlist_id] || []),
              asset,
            ];
            return acc;
          }, {});

          setWatchlistAssets(grouped);
        }
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (Object.keys(watchlistAssets).length === 0) {
      fetchAssets();
    }

    // Realtime channel: watchlist_assets
    const assetChannel = supabase
      .channel(`user-assets-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "watchlist_assets",
          filter: `profile_id=eq.${userId}`,
        },
        async (payload) => {
          if (payload.eventType === "INSERT" && payload.new) {
            const { data: priceData } = await supabase
              .from("prices")
              .select("*")
              .eq("symbol", payload.new.asset_symbol)
              .single();

            const wlId = payload.new.watchlist_id;

            setWatchlistAssets((prev) => {
              const updated = { ...prev };
              updated[wlId] = [
                ...(updated[wlId] || []),
                { ...payload.new, prices: priceData },
              ];
              return updated;
            });
          }

          if (payload.eventType === "UPDATE" && payload.new) {
            const wlId = payload.new.watchlist_id;
            setWatchlistAssets((prev) => {
              const updated = { ...prev };
              const wlId = payload.new.watchlist_id;
              updated[wlId] = (updated[wlId] || []).map((a) =>
                a.id === payload.new.id ? { ...a, ...payload.new } : a
              );
              return updated;
            });
          }

          if (payload.eventType === "DELETE" && payload.old) {
            setWatchlistAssets((prev) => {
              const updated = { ...prev };
              let wlId;

              for (const key of Object.keys(updated)) {
                if (updated[key].some((a) => a.id === payload.old.id)) {
                  wlId = key;
                  break;
                }
              }
              if (!wlId) return updated;

              updated[wlId] = updated[wlId].filter(
                (a) => a.id !== payload.old.id
              );
              return updated;
            });
          }
        }
      )
      .subscribe();

    // Realtime channel: prices updates
    const priceChannel = supabase
      .channel("prices-changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "prices",
        },
        (payload) => {
          setWatchlistAssets((prev) => {
            const updated = { ...prev };
            Object.keys(updated).forEach((wlId) => {
              updated[wlId] = updated[wlId].map((asset) =>
                asset.asset_symbol === payload.new.symbol
                  ? { ...asset, prices: payload.new }
                  : asset
              );
            });
            return updated;
          });
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(assetChannel);
      supabase.removeChannel(priceChannel);
    };
  }, [userId]);

  /*
  Due to Alpaca's websocket API free tier limitations, resort to polling for any non-active assets within
  user's watchlists

  Docs: https://docs.alpaca.markets/docs/streaming-market-data
  */
  useEffect(() => {
    if (!userId || !watchlistAssets) return;

    const interval = setInterval(async () => {
      try {
        const inactiveAssets = Object.values(watchlistAssets)
          .flat()
          .filter((asset) => asset.prices?.status === false);

        if (inactiveAssets.length === 0) return;

        const symbols = [...new Set(inactiveAssets.map((a) => a.asset_symbol))];

        const res = await fetch(
          `https://data.alpaca.markets/v2/stocks/snapshots?symbols=${symbols.join(
            ","
          )}`,
          {
            headers: {
              "APCA-API-KEY-ID": import.meta.env.VITE_ALPACA_KEY,
              "APCA-API-SECRET-KEY": import.meta.env.VITE_ALPACA_SECRET,
            },
          }
        );
        const json = await res.json();

        const processedData = (
          await Promise.all(
            symbols.map(async (symbol) => {
              const s = json[symbol];
              if (!s?.latestTrade || !s?.prevDailyBar) return null;

              const price = s.latestTrade.p.toFixed(2);
              const prevClose = s.prevDailyBar.c;
              const change = price - prevClose;
              const percentChange = ((change / prevClose) * 100).toFixed(2);

              return {
                symbol,
                price,
                change: change.toFixed(2),
                percent_change: percentChange,
                volume: (s.dailyBar?.v * s.dailyBar?.vw).toFixed(0) || 0,
                updated_at: new Date().toISOString(),
              };
            })
          )
        ).filter(Boolean);

        console.log(processedData);

        const { data: upsertData, error: upsertError } = await supabase
          .from("prices")
          .upsert(processedData, { onConflict: ["symbol"] });

        if (upsertError) {
          console.log("Error upserting inactive prices:", upsertError);
        }
      } catch (err) {
        console.error("Failed to update prices:", err);
        setError(err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [userId, watchlistAssets]);

  return {
    assets: watchlistId ? watchlistAssets[watchlistId] || [] : [],
    loading,
    error,
  };
}
