import { useState, useEffect } from "react";
import { useTickerBar } from "../stores/TickerBarContext";
import { TICKERBAR_ASSETS } from "../../../config/variables";
import TickerItem from "./TickerItem";
import { supabase } from "../../../app/supabase-client";
import { useScrollHide } from "../../../stores/ScrollHideContext";

export default function TickerBar() {
  const { assets, setAssets } = useTickerBar();
  const [loading, setLoading] = useState(true);
  const { hidden } = useScrollHide();

  useEffect(() => {
    async function fetchAssets() {
      setLoading(true);

      const symbols = TICKERBAR_ASSETS.map((t) => t.symbol);

      const { data, error } = await supabase
        .from("prices")
        .select("*")
        .in("symbol", symbols);

      if (!error && data) setAssets(data);
      setLoading(false);
    }

    if (assets.length === 0) fetchAssets();
  }, [assets]);

  return (
    <div
      className={`sticky top-20 z-10 h-[57px] overflow-hidden bg-bg-light flex whitespace-nowrap border-b border-border cursor-default transition-transform duration-400 ${
        hidden ? "-translate-y-[80px]" : "translate-y-0"
      }`}
    >
      <ul className="flex gap-10 py-4 animate-infinite-scroll hover:[animation-play-state:paused]">
        {[...assets, ...assets].map((asset, key) => (
          <TickerItem key={key} asset={asset} />
        ))}
      </ul>
    </div>
  );
}
