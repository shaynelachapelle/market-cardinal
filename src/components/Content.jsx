import React from "react";
import NewsFeed from "./NewsFeed";
import PriceFeed from "./PriceFeed";

function Content() {
  return (
    <div className="grid grid-cols-3 gap-4 my-4 px-4 min-h-screen">
      <div className="col-span-2 shadow-md bg-bg border border-border rounded-lg p-4">
        <div className="flex flex-row justify-between items-center mb-4">
          <h2 className="w-full text-text">News</h2>
          <div className="rounded-full w-fit border border-border-muted appearance-none bg-bg-light text-text-muted text-sm py-1 px-2">
            <select
              className="border-none focus:outline-none focus:ring-0"
              name="categories"
              id="categories"
            >
              <option value="general">General</option>
              <option value="forex">Forex</option>
              <option value="crypto">Crypto</option>
            </select>
          </div>
        </div>
        <NewsFeed />
      </div>
      <div className="col-span-1 bg-bg shadow-md border border-border rounded-lg p-4">
        <div className="flex flex-row justify-between items-center mb-4">
          <h2 className="w-full text-text">Live Prices</h2>
          <div className="rounded-full w-fit border border-border-muted appearance-none bg-bg-light text-text-muted text-sm py-1 px-2">
            <select
              className="border-none focus:outline-none focus:ring-0"
              name="categories"
              id="categories"
            >
              <option value="general">Stocks</option>
              <option value="crypto">Crypto</option>
            </select>
          </div>
        </div>
        <PriceFeed />
      </div>
    </div>
  );
}

export default Content;
