import React, { useState, useEffect } from "react";
import PriceCard from "./PriceCard";
import { supabase } from "../supabase-client.js";
import PriceCardSkeleton from "./PriceCardSkeleton.jsx";
import { useAssetCategory } from "./AssetCategoryContext.jsx";

function PriceFeed() {
  const { assetCategory } = useAssetCategory();

  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAssets() {
      setLoading(true);
      const { data, error } = await supabase
        .from("prices")
        .select("*")
        .order("volume", { ascending: false })
        .eq("asset_type", assetCategory.toLowerCase())
        .not("volume", "is", null)
        .limit(10);

      if (error) {
        console.error("Error fetching assets: ", error);
      } else {
        setAssets(data);
      }
      setLoading(false);
    }
    fetchAssets();
    //const interval = setInterval(fetchAssets, 1000);

    //return () => clearInterval(interval);
  }, [assetCategory]);

  if (loading)
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 10 }).map((_, id) => (
          <PriceCardSkeleton key={id} />
        ))}
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      {assets.map((asset, idx) => (
        <PriceCard key={idx} asset={asset} />
      ))}
    </div>
  );
}

export default PriceFeed;
