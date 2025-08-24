import { useState } from "react";
import NewsFeed from "./NewsFeed";
import PriceFeed from "./PriceFeed";
import Dropdown from "./Dropdown";
import { useNewsCategory } from "./NewsCategoryContext";
import { useAssetCategory } from "./AssetCategoryContext";

function Content() {
  const { newsCategory, setNewsCategory } = useNewsCategory();
  const { assetCategory, setAssetCategory } = useAssetCategory();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4 px-2 md:px-4 min-h-screen">
      <div className="col-span-2 shadow-md bg-bg border border-border rounded-lg py-3 px-2 md:p-4">
        <div className="flex flex-row justify-between items-center mb-3 md:mb-4">
          <h2 className="w-full text-text pl-1 md:pl-0">News</h2>
          <div className="">
            <Dropdown
              options={["General", "Crypto"]}
              selected={newsCategory}
              onSelect={(value) => setNewsCategory(value)}
            />
          </div>
        </div>
        <NewsFeed />
      </div>
      <div className="col-span-2 md:col-span-1 bg-bg shadow-md border border-border rounded-lg py-3 px-2 md:p-4">
        <div className="flex flex-row justify-between items-center mb-3 md:mb-4">
          <h2 className="w-full text-text pl-1 md:pl-0">Live Prices</h2>
          <div className="">
            <Dropdown
              options={["Stocks", "Crypto"]}
              selected={assetCategory}
              onSelect={(value) => setAssetCategory(value)}
            />
          </div>
        </div>
        <PriceFeed />
      </div>
    </div>
  );
}

export default Content;
