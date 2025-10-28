import { MinusIcon } from "@heroicons/react/24/outline";
import { useAssetContext } from "../stores/AssetContext";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../../../app/supabase-client";
import useLogo from "../../../hooks/useLogo";
import { formatDollar } from "../../../utils/formatters";

export default function AssetHeader() {
  const { symbol, details, location } = useAssetContext();
  const [asset, setAsset] = useState(location?.state?.asset ?? null);
  const [loading, setLoading] = useState(false);
  const [shouldPoll, setShouldPoll] = useState(false);
  const updateIntervalRef = useRef(null);

  useEffect(() => {
    if (location?.state?.asset) {
      setAsset(location?.state?.asset);
    }

    async function fetchAsset() {
      try {
        const { data, error } = await supabase
          .from("prices")
          .select("*")
          .eq("symbol", symbol)
          .single();

        if (error) {
          console.error(error);
          return;
        }

        /*
        Due to Alpaca websocket free tier symbol limit (30), resort to polling if symbol is not active
        Docs: https://docs.alpaca.markets/docs/streaming-market-data
        */
        if (data?.status) {
          setAsset(data);
          setShouldPoll(false);
        } else {
          setShouldPoll(true);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    if (symbol && !location?.state?.asset) {
      setLoading(true);
      fetchAsset();
    }
  }, [symbol, location?.state?.asset]);

  useEffect(() => {
    if (!shouldPoll || !symbol) return;

    fetchStockData(symbol);
    updateIntervalRef.current = setInterval(fetchStockData, 1000, symbol);

    return () => {
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
        updateIntervalRef.current = null;
      }
    };
  }, [shouldPoll, symbol]);

  useEffect(() => {
    const currentSymbol = symbol;
    if (!currentSymbol) return;

    const channel = supabase
      .channel(`asset-price-realtime-${currentSymbol}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "prices",
          filter: `symbol=eq.${currentSymbol}`,
        },
        (payload) => {
          if (payload.eventType === "UPDATE") {
            setAsset(payload.new);
          }
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [symbol]);

  const logo = loading ? null : useLogo(asset);

  return (
    <div className="flex flex-row gap-10 bg-bg p-8 mx-4 border border-border rounded-lg cursor-default">
      {!logo ? (
        <div className="skeleton h-42 w-42 rounded-xl bg-text-muted"></div>
      ) : (
        <img src={logo} className="h-42 w-42 rounded-xl" />
      )}
      <div className="flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-3">
          {asset?.name && !loading ? (
            <h2 className="text-text font-semibold text-4xl">{asset?.name}</h2>
          ) : (
            <div className="skeleton w-100 h-6 bg-text rounded-xl"></div>
          )}
          {(asset?.name || symbol) && !loading ? (
            <h3 className="flex flex-row gap-4 text-text-muted font-semibold text-xl">
              {asset?.symbol || symbol}{" "}
              {details && (
                <span className="border border-border-muted bg-bg-light rounded px-1 text-lg">
                  {details?.exchange}
                </span>
              )}
            </h3>
          ) : (
            <div className="skeleton w-20 h-5 bg-text-muted rounded-xl"></div>
          )}
        </div>

        <div className="flex flex-row gap-5">
          {asset?.price && !loading ? (
            <div className="flex flex-row items-end gap-2 text-text">
              <p className="font-mono text-5xl">{formatDollar(asset?.price)}</p>
              <p>USD</p>
            </div>
          ) : !asset?.price && !loading ? (
            <MinusIcon className="text-text-muted size-8" />
          ) : (
            <div className="skeleton flex flex-row items-end gap-2">
              <div className="h-10 w-40 bg-text rounded-xl"></div>
              <div className="h-4 w-10 bg-text rounded-xl"></div>
            </div>
          )}

          {asset?.change && !loading ? (
            <p
              className={`flex items-end text-2xl h-full font-mono ${
                asset?.change > 0
                  ? "text-green-500"
                  : asset?.change < 0
                  ? "text-red-500"
                  : "text-text-muted"
              }`}
            >
              {asset?.change > 0
                ? `+${formatDollar(asset?.change)}`
                : formatDollar(asset?.change)}{" "}
              (
              {asset?.percent_change > 0
                ? `+${asset?.percent_change.toFixed(2)}`
                : asset?.percent_change.toFixed(2)}
              %)
            </p>
          ) : !asset?.change && !loading ? (
            <MinusIcon className="text-text-muted size-8" />
          ) : (
            <div className="flex items-end gap-2">
              <div className="skeleton w-20 h-6 bg-text rounded-xl"></div>
              <div className="skeleton w-20 h-6 bg-text rounded-xl"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

async function fetchStockData(symbol) {
  try {
    const res = await fetch(
      `https://data.alpaca.markets/v2/stocks/snapshots?symbols=${symbol}`,
      {
        headers: {
          "APCA-API-KEY-ID": import.meta.env.VITE_ALPACA_KEY,
          "APCA-API-SECRET-KEY": import.meta.env.VITE_ALPACA_SECRET,
        },
      }
    );
    const json = await res.json();
    const s = json[symbol];

    if (!s || !s.latestTrade) return;

    const price = s.latestTrade.p.toFixed(2);
    const prevClose = s.prevDailyBar.c;
    const change = price - prevClose;
    const percentChange = ((change / prevClose) * 100).toFixed(2);
    const volume = (s.dailyBar?.v * s.dailyBar?.vw).toFixed(0) || 0;

    const { error } = await supabase
      .from("prices")
      .update({
        price,
        previous_close: prevClose,
        change,
        percent_change: percentChange,
        volume,
        updated_at: new Date().toISOString(),
      })
      .eq("symbol", symbol);

    if (error) console.log(error);
  } catch (e) {
    console.error(e);
  }
}
