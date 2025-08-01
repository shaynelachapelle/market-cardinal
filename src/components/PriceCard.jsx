import React from "react";

function PriceCard({ stock }) {
  const SYMBOL_MAP = {
    AAPL: "Apple Inc.",
    TSLA: "Tesla Inc.",
    MSFT: "Microsoft Corp.",
    AMZN: "Amazon.com Inc.",
    META: "Meta Platforms Inc.",
    AVGO: "Broadcom Inc.",
    NVDA: "NVIDIA Corp",
  };

  const logo = `https://img.logo.dev/ticker/${stock.symbol}?token=${
    import.meta.env.VITE_LOGODEV_KEY
  }&size=128&retina=true`;

  return (
    <a
      href="#"
      target="_blank"
      rel="noopener noreferrer"
      className="border border-gray-300 shadow-sm rounded-md p-4 hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-row justify-center items-center gap-4">
          <div className="flex w-8 h-8">
            <img className="rounded-xl" src={logo} />
          </div>
          <div className="flex flex-col text-left gap-1">
            <h3 className="flex flex-row items-center gap-2 font-semibold">
              {stock.symbol}{" "}
              {stock.change > 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="fill-green-500 size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.808 4.057a.75.75 0 0 1 .92-.527l3.116.849a.75.75 0 0 1 .528.915l-.823 3.121a.75.75 0 0 1-1.45-.382l.337-1.281a23.484 23.484 0 0 0-3.609 3.056.75.75 0 0 1-1.07.01L6 8.06l-3.72 3.72a.75.75 0 1 1-1.06-1.061l4.25-4.25a.75.75 0 0 1 1.06 0l1.756 1.755a25.015 25.015 0 0 1 3.508-2.85l-1.46-.398a.75.75 0 0 1-.526-.92Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="fill-red-500 size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.22 4.22a.75.75 0 0 1 1.06 0L6 7.94l2.761-2.762a.75.75 0 0 1 1.158.12 24.9 24.9 0 0 1 2.718 5.556l.729-1.261a.75.75 0 0 1 1.299.75l-1.591 2.755a.75.75 0 0 1-1.025.275l-2.756-1.591a.75.75 0 1 1 .75-1.3l1.097.634a23.417 23.417 0 0 0-1.984-4.211L6.53 9.53a.75.75 0 0 1-1.06 0L1.22 5.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </h3>
            <p className="text-gray-700 font-light text-sm">
              {SYMBOL_MAP[stock.symbol]}
            </p>
          </div>
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
