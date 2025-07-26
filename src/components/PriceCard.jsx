import React from "react";

function PriceCard() {
  return (
    <div className="flex flex-row justify-between border border-gray-300 shadow-sm rounded-md p-4">
      <div className="flex flex-col text-left">
        <h3 className="font-semibold">Ticker Symbol</h3>
        <p className="text-gray-700 text-sm">Company Name</p>
      </div>
      <div className="flex flex-col text-right font-mono">
        <h3 className="font-semibold">Current Price</h3>
        <p>Price Change</p>
        <div className="text-gray-700 text-xs">
          <p>Volume | Cap</p>
        </div>
      </div>
    </div>
  );
}

export default PriceCard;
