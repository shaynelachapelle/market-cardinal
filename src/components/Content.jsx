import { useState } from "react";
import NewsFeed from "./NewsFeed";
import PriceFeed from "./PriceFeed";
import Dropdown from "./Dropdown";

function Content() {
  const [newsCategory, setNewsCategory] = useState("General");
  const [priceFilter, setPriceFilter] = useState("Stocks");

  return (
    <div className="grid grid-cols-3 gap-4 my-4 px-4 min-h-screen">
      <div className="col-span-2 shadow-md bg-bg border border-border rounded-lg p-4">
        <div className="flex flex-row justify-between items-center mb-4">
          <h2 className="w-full text-text">News</h2>
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
      <div className="col-span-1 bg-bg shadow-md border border-border rounded-lg p-4">
        <div className="flex flex-row justify-between items-center mb-4">
          <h2 className="w-full text-text">Live Prices</h2>
          <div className="">
            <Dropdown
              options={["Stocks", "Crypto"]}
              selected={priceFilter}
              onSelect={(value) => setPriceFilter(value)}
            />
          </div>
        </div>
        <PriceFeed />
      </div>
    </div>
  );
}

export default Content;
