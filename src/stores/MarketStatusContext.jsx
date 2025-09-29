import { createContext, useContext, useEffect, useState } from "react";

const MarketStatusContext = createContext();

export function MarketStatusProvider({ children }) {
  const [isMarketOpen, setIsMarketOpen] = useState(false);

  useEffect(() => {
    async function fetchMarketStatus() {
      try {
        const data = await fetch(
          `https://finnhub.io/api/v1/stock/market-status?exchange=US&token=${
            import.meta.env.VITE_FINNHUB_KEY
          }`
        );

        const json = await data.json();
        setIsMarketOpen(json?.isOpen && json?.session === "regular");
      } catch (err) {
        console.log("Error fetching market status: ", err);
      }
    }

    fetchMarketStatus();

    const marketInterval = setInterval(fetchMarketStatus, 1000 * 60 * 10);

    return () => {
      clearInterval(marketInterval);
    };
  }, []);

  return (
    <MarketStatusContext.Provider value={{ isMarketOpen, setIsMarketOpen }}>
      {children}
    </MarketStatusContext.Provider>
  );
}

export function useMarketStatus() {
  return useContext(MarketStatusContext);
}
