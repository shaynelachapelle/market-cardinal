import { useState } from "react";
import NewsFeed from "../../features/news-feed/components/NewsFeed";
import PriceFeed from "../../features/price-feed/components/PriceFeed";
import Dropdown from "../../components/Dropdown";
import {
  NewsCategoryProvider,
  useNewsCategory,
} from "../../features/news-feed/stores/NewsCategoryContext";
import {
  AssetCategoryProvider,
  useAssetCategory,
} from "../../features/price-feed/stores/AssetCategoryContext";

function OverviewContent() {
  const { newsCategory, setNewsCategory } = useNewsCategory();
  const { assetCategory, setAssetCategory } = useAssetCategory();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4 px-2 md:px-4 min-h-screen">
      <div className="col-span-2 shadow-md bg-bg border border-border rounded-lg py-3 px-2 md:p-4">
        <div className="flex flex-row justify-between items-center mb-3 md:mb-4">
          <h2 className="w-full text-text pl-1 md:pl-0">News</h2>
          <Dropdown
            options={["General", "Crypto"]}
            selected={newsCategory}
            onSelect={(value) => setNewsCategory(value)}
          />
        </div>
        <NewsFeed />
      </div>

      <div className="col-span-2 md:col-span-1 bg-bg shadow-md border border-border rounded-lg py-3 px-2 md:p-4">
        <div className="flex flex-row justify-between items-center mb-3 md:mb-4">
          <h2 className="w-full text-text pl-1 md:pl-0">Live Prices</h2>
          <Dropdown
            options={["Stocks", "Crypto"]}
            selected={assetCategory}
            onSelect={(value) => setAssetCategory(value)}
          />
        </div>
        <PriceFeed />
      </div>
    </div>
  );
}

export default function OverviewPage() {
  return (
    <NewsCategoryProvider>
      <AssetCategoryProvider>
        <OverviewContent />
      </AssetCategoryProvider>
    </NewsCategoryProvider>
  );
}
