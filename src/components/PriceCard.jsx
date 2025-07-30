import React from "react";

function PriceCard({ stock }) {
  const SYMBOL_MAP = {
    AAPL: "Apple Inc.",
    TSLA: "Tesla Inc.",
    MSFT: "Microsoft Corp.",
    AMZN: "Amazon.com Inc.",
    META: "Meta Platforms Inc.",
    AVGO: "Broadcom Inc.",
  };

  return (
    <a
      href="#"
      target="_blank"
      rel="noopener noreferrer"
      className="border border-gray-300 shadow-sm rounded-md p-4 hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-col text-left gap-1">
          <h3 className="font-semibold">{stock.symbol}</h3>
          <p className="text-gray-700 font-light text-sm">
            {SYMBOL_MAP[stock.symbol]}
          </p>
        </div>
        <div className="flex flex-col text-right font-mono">
          <h3 className="font-semibold">${stock.current.toFixed(2)}</h3>
          <p className={stock.change > 0 ? "text-green-500" : "text-red-500"}>
            {stock.change} ({stock.percentChange}%)
          </p>
          <div className="text-gray-700 text-xs">
            <p>Vol: {stock.volume}</p>
          </div>
        </div>
      </div>
    </a>
  );
}

export default PriceCard;
