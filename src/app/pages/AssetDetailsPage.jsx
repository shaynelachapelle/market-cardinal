import { useLocation, useParams } from "react-router-dom";
import { supabase } from "../supabase-client";
import { useEffect, useState, useMemo } from "react";
import { AssetContext } from "../../features/asset-details/stores/AssetContext";

import AssetHeader from "../../features/asset-details/components/AssetHeader";
import AssetChartSection from "../../features/asset-details/components/AssetChartSection";
import AssetStats from "../../features/asset-details/components/AssetStats";
import AssetAbout from "../../features/asset-details/components/AssetAbout";

export default function AssetDetailsPage() {
  const { symbol } = useParams();
  const location = useLocation();

  const [asset, setAsset] = useState(location.state?.asset ?? null);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (location.state?.asset) {
      setAsset(location.state?.asset);
    }
    setDetails(null);

    async function fetchAsset() {
      const { data, error } = await supabase
        .from("prices")
        .select("*")
        .eq("symbol", symbol)
        .single();

      if (!error && data) {
        setAsset(data);
      }
      setLoading(false);
    }

    if (symbol && !location.state?.asset) {
      setLoading(true);
      fetchAsset();
    }
  }, [symbol]);

  useEffect(() => {
    const channel = supabase
      .channel("asset-price-realtime")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "prices",
          filter: `symbol=eq.${asset?.symbol || symbol}`,
        },
        (payload) => {
          if (payload.eventType === "UPDATE") {
            setAsset(payload.new);
          }
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

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
            asset_type: asset.asset_type,
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

  const contextValue = useMemo(
    () => ({ asset, details, loading, symbol }),
    [asset, details, loading, symbol]
  );

  return (
    <AssetContext.Provider value={contextValue}>
      <div className="w-screen flex flex-col gap-4 my-4 px-2">
        <AssetHeader />
        <AssetChartSection />
        <AssetStats />
        <AssetAbout />
      </div>
    </AssetContext.Provider>
  );
}

export function formatDollar(amount) {
  const num = Number(amount);

  if (isNaN(num)) return amount;

  if (Math.abs(num) >= 1000) {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  if (Math.abs(num) >= 1) {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  });
}
