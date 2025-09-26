import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../../../app/supabase-client";
import { DEFAULT_TICKERS } from "../../../config/variables";

const PriceFeedContext = createContext();

export function PriceFeedProvider({ children }) {
  const [assets, setAssets] = useState([]);

  const symbols = DEFAULT_TICKERS.map((t) => t.symbol);
  const filter = `symbol=in.(${symbols.join(",")})`;

  useEffect(() => {
    const channel = supabase
      .channel("prices-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "prices", filter },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setAssets((prev) => {
              const exists = prev.find((a) => a.id === payload.new.id);
              if (exists) return prev;
              return [payload.new, ...prev];
            });
          } else if (payload.eventType === "UPDATE") {
            setAssets((prev) =>
              prev.map((a) => (a.id === payload.new.id ? payload.new : a))
            );
          } else if (payload.eventType === "DELETE") {
            setAssets((prev) => prev.filter((a) => a.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  return (
    <PriceFeedContext.Provider value={{ assets, setAssets }}>
      {children}
    </PriceFeedContext.Provider>
  );
}

export function usePriceFeed() {
  return useContext(PriceFeedContext);
}
