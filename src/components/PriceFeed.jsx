import React, { useState, useEffect } from "react";
import PriceCard from "./PriceCard";

function PriceFeed() {
  const [stocks, setStocks] = useState([]);
  const symbols = ["AAPL", "TSLA", "MSFT", "AMZN", "AVGO", "META", "NVDA"];

  useEffect(() => {
    async function fetchStocks() {
      try {
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
        const data = await res.json();

        const processed = symbols
          .map((symbol) => {
            const s = data[symbol];
            if (!s?.latestTrade || !s?.prevDailyBar) return null;

            const current = s.latestTrade.p;
            const prevClose = s.prevDailyBar.c;
            const change = current - prevClose;
            const percentChange = ((change / prevClose) * 100).toFixed(2);

            return {
              symbol,
              current,
              change: change.toFixed(2),
              percentChange,
              volume: s.dailyBar?.v || 0,
            };
          })
          .filter(Boolean);

        setStocks(processed);
      } catch (err) {
        console.error("Error fetching stocks:", err);
      }
    }
    fetchStocks();
    const interval = setInterval(fetchStocks, 1000); // update every 1s

    return () => clearInterval(interval); // cleanup when component unmounts
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {stocks.map((stock, idx) => (
        <PriceCard key={stock.symbol} stock={stock} />
      ))}
    </div>
  );
}

export default PriceFeed;
