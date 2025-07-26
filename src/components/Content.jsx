import React from "react";
import NewsFeed from "./NewsFeed";
import PriceFeed from "./PriceFeed";

function Content() {
  return (
    <div className="grid grid-cols-3 gap-4 my-4 px-4">
      <div className="col-span-2 bg-white shadow-md border border-gray-500 rounded-lg p-4">
        <div className="flex flex-row justify-between items-center mb-4">
          <h2 className="w-full ">News</h2>
          <div className="rounded-full w-fit border-none appearance-none bg-gray-200 text-sm py-1 px-2">
            <select
              className="border-none focus:outline-none focus:ring-0"
              name="categories"
              id="categories"
            >
              <option value="general">General</option>
              <option value="forex">Forex</option>
              <option value="crypto">Crypto</option>
              <option value="merger">Merger</option>
            </select>
          </div>
        </div>
        <NewsFeed />
      </div>
      <div className="col-span-1 bg-white shadow-md border border-gray-500 rounded-lg p-4">
        <h2 className="w-full mb-5">Live Prices</h2>
        <PriceFeed />
      </div>
    </div>
  );
}

export default Content;
