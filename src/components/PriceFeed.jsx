import React, { useState, useEffect } from "react";
import PriceCard from "./PriceCard";
import { supabase } from "../supabase-client.js";
import PriceCardSkeleton from "./PriceCardSkeleton.jsx";

function PriceFeed() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAssets() {
      const { data, error } = await supabase
        .from("prices")
        .select("*")
        .order("volume", { ascending: false })
        .limit(10);

      console.log(data);

      if (error) {
        console.error("Error fetching assets: ", error);
      } else {
        console.log(data);
        setAssets(data);
      }
      setLoading(false);
    }
    fetchAssets();
    const interval = setInterval(fetchAssets, 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading)
    return (
      <div className="flex flex-col gap-4">
        <PriceCardSkeleton />
        <PriceCardSkeleton />
        <PriceCardSkeleton />
        <PriceCardSkeleton />
        <PriceCardSkeleton />
        <PriceCardSkeleton />
        <PriceCardSkeleton />
        <PriceCardSkeleton />
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      {assets.map((asset, idx) => (
        <PriceCard key={asset.symbol} asset={asset} />
      ))}
    </div>
  );
}

export default PriceFeed;
