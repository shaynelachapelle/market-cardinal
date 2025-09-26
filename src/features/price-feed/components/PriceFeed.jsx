import { useState, useEffect } from "react";
import PriceCard from "./PriceCard";
import { supabase } from "../../../app/supabase-client.js";
import PriceCardSkeleton from "./PriceCardSkeleton.jsx";
import { useAssetCategory } from "../stores/AssetCategoryContext.jsx";
import { usePriceFeed } from "../stores/PriceFeedContext.jsx";
import { DEFAULT_TICKERS } from "../../../config/variables.js";

export default function PriceFeed() {
  const { assetCategory } = useAssetCategory();
  const { assets, setAssets } = usePriceFeed();
  const [loading, setLoading] = useState(true);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    async function fetchAssets() {
      setLoading(true);

      const symbols = DEFAULT_TICKERS.map((t) => t.symbol);

      const { data, error } = await supabase
        .from("prices")
        .select("*")
        .in("symbol", symbols);

      if (!error && data) setAssets(data);
      setLoading(false);
    }

    if (assets.length === 0) fetchAssets();

    setFiltered(
      assets
        .filter((a) => a.asset_type === assetCategory.toLowerCase())
        .sort((a, b) => b.volume - a.volume)
    );
  }, [assetCategory, assets]);

  return (
    <div className="flex flex-col gap-4">
      {loading && assets.length === 0
        ? Array.from({ length: 10 }).map((_, id) => (
            <PriceCardSkeleton key={id} />
          ))
        : filtered.map((asset, idx) => <PriceCard key={idx} asset={asset} />)}
    </div>
  );
}
