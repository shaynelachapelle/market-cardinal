import React from "react";

function PriceCard({ stock }) {
  return (
    <a
      href="#"
      target="_blank"
      rel="noopener noreferrer"
      className="border border-gray-300 shadow-sm rounded-md p-4 hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-col text-left">
          <h3 className="font-semibold">{stock.symbol}</h3>
          <p className="text-gray-700 text-sm">Company Name</p>
        </div>
        <div className="flex flex-col text-right font-mono">
          <h3 className="font-semibold">${stock.current}</h3>
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
