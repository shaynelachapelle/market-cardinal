import { useEffect, useState } from "react";
import { supabase } from "../../../app/supabase-client";
import { useWatchlistContext } from "../stores/WatchlistContext";

export default function useWatchlistAssets(userId, watchlistId) {
  const { watchlistAssets, setWatchlistAssets } = useWatchlistContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
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
              change
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
          console.log("Realtime payload:", payload);

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

  return {
    assets: watchlistId ? watchlistAssets[watchlistId] || [] : [],
    loading,
    error,
  };
}
