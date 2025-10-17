import { useEffect, useState, useContext, createContext } from "react";
import { supabase } from "../../../app/supabase-client";

export const AssetContext = createContext();

export function AssetContextProvider({ children, symbol, location }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      const { data: details, error: detailsError } = await supabase
        .from("assets")
        .select("*")
        .eq("symbol", symbol)
        .maybeSingle(); // tolerate no row

      if (!detailsError && details) {
        setDetails(details);
        return;
      } else {
        const response = await fetch(
          `https://financialmodelingprep.com/stable/profile?symbol=${symbol}&apikey=${
            import.meta.env.VITE_FMP_KEY
          }`
        );
        const json = await response.json();
        const profile = Array.isArray(json) ? json[0] : json;

        if (!profile) {
          console.warn("No profile found for", symbol);
          return;
        }

        setDetails(profile);

        const { error: insertError } = await supabase.from("assets").insert([
          {
            symbol: profile.symbol,
            name: profile.companyName,
            asset_type: profile.isEtf ? "ETFs" : "stocks",
            market_cap: profile.marketCap,
            sector: profile.sector,
            industry: profile.industry,
            ceo: profile.ceo,
            country: profile.country,
            address: profile.address,
            city: profile.city,
            state: profile.state,
            ipo_date: profile.ipoDate,
            description: profile.description,
            website: profile.website,
            exchange: profile.exchange,
            beta: profile.beta,
            employees: profile.fullTimeEmployees,
            currency: profile.currency,
            average_volume: profile.averageVolume,
          },
        ]);

        if (insertError) {
          console.error("Insert failed:", insertError);
        }
      }
    }

    if (symbol) {
      fetchDetails();
    }
  }, [symbol]);

  return (
    <AssetContext.Provider value={{ details, symbol }}>
      {children}
    </AssetContext.Provider>
  );
}

export function useAssetContext() {
  return useContext(AssetContext);
}
