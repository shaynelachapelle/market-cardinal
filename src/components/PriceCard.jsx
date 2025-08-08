import React from "react";
import { useTheme } from "./ThemeContext";

function PriceCard({ asset }) {
  const { theme, setTheme } = useTheme();

  const logo = `https://img.logo.dev/ticker/${asset.symbol}?token=${
    import.meta.env.VITE_LOGODEV_KEY
  }&size=128&retina=true&format=png&theme=${
    theme === "dark" ? "dark" : "light"
  }`;

  return (
    <a
      href="#"
      target="_blank"
      rel="noopener noreferrer"
      className={`border border-border-muted bg-bg-light shadow-sm rounded-md p-4 hover:shadow-md transition cursor-pointer duration-200 ${
        theme === "dark"
          ? "shadow-white shadow-xs hover:shadow-sm"
          : "shadow-sm"
      }`}
    >
      <div className="flex flex-row justify-between gap-4 ">
        <div className="flex flex-row justify-center  items-center gap-4">
          <div className="flex w-8 h-8 bg-none">
            <img className="rounded-xl" src={logo} />
          </div>
          <div className="flex flex-col text-left gap-1">
            <h3 className="flex flex-row items-center gap-2 text-text font-semibold">
              {asset.symbol}{" "}
              {asset.change > 0 ? (
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
            <p className="text-text-muted font-light text-sm">{asset.name}</p>
          </div>
        </div>

        <div className="flex flex-col text-right text-text font-mono">
          <h3 className="font-semibold">${asset.price.toFixed(2)}</h3>
          <p className={asset.change > 0 ? "text-green-500" : "text-red-500"}>
            {asset.change.toFixed(2)} ({asset.percent_change.toFixed(2)}%)
          </p>
          <div className="text-text-muted text-xs">
            <p>Vol: {asset.volume}</p>
          </div>
        </div>
      </div>
    </a>
  );
}

export default PriceCard;
