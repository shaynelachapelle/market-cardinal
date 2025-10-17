import React, { useState } from "react";
import { useTheme } from "../../../stores/ThemeContext";
import { Link } from "react-router-dom";
import {
  TrashIcon,
  MinusIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/16/solid";

export default function WatchlistAssetCard({ asset, onDelete }) {
  const { theme } = useTheme();

  const logo =
    asset.asset_type === "crypto"
      ? `https://img.logo.dev/crypto/${normalizeTicker(asset.symbol)}?token=${
          import.meta.env.VITE_LOGODEV_KEY
        }&size=128&retina=true&format=png&theme=${
          theme === "dark" ? "dark" : "light"
        }`
      : `https://img.logo.dev/ticker/${asset.symbol}?token=${
          import.meta.env.VITE_LOGODEV_KEY
        }&size=128&retina=true&format=png&theme=${
          theme === "dark" ? "dark" : "light"
        }`;

  function normalizeTicker(ticker) {
    return ticker.endsWith("/USD") ? ticker.replace("/USD", "USD") : ticker;
  }

  return (
    <Link
      to={`/assets/${normalizeTicker(asset.symbol)}`}
      state={{ asset }}
      className={`border w-full border-border-muted bg-bg-light shadow-sm rounded-md py-3 px-2 md:p-4 hover:shadow-md transition cursor-pointer duration-200 ${
        theme === "dark"
          ? "shadow-white shadow-xs hover:shadow-sm"
          : "shadow-sm"
      }`}
    >
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-row justify-start items-center w-70 gap-3 md:gap-4">
          <div className="flex w-8 h-8 bg-none">
            <img className="rounded-xl" src={logo} />
          </div>
          <div className="flex flex-col text-left md:gap-1">
            <h3 className="flex flex-row items-center gap-2 text-text font-semibold">
              {asset.symbol}{" "}
              {asset.change > 0 ? (
                <ArrowTrendingUpIcon className="fill-green-500 size-4" />
              ) : asset.change < 0 ? (
                <ArrowTrendingDownIcon className="fill-red-500 size-4" />
              ) : (
                <MinusIcon className="text-text-muted size-3" />
              )}
            </h3>
            <p className="truncate max-w-28 md:max-w-56 text-text-muted font-light text-sm">
              {asset.name}
            </p>
          </div>
        </div>

        {asset.price != null ? (
          <h3 className="font-semibold font-mono text-text w-10">
            $
            {formatDollar(
              asset.asset_type === "stocks"
                ? asset.price.toFixed(2)
                : asset.price
            )}
          </h3>
        ) : (
          <MinusIcon className="text-text-muted size-3" />
        )}

        {asset.change != null ? (
          <p
            className={`w-10 font-mono ${
              asset.change > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {asset.change > 0
              ? `+${formatDollar(asset.change)}`
              : formatDollar(asset.change)}{" "}
          </p>
        ) : (
          <MinusIcon className="text-text-muted size-3" />
        )}

        {asset.change != null && asset.percent_change != null ? (
          <p
            className={`w-10 font-mono ${
              asset.change > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {asset.percent_change > 0
              ? `+${asset.percent_change.toFixed(2)}`
              : asset.percent_change.toFixed(2)}
            %
          </p>
        ) : (
          <MinusIcon className="text-text-muted size-3" />
        )}

        {asset.volume != null ? (
          <div className="hidden md:block pt-1 w-28 text-text-muted font-mono text-sm">
            <p>Vol: ${formatDollarAbbrev(asset.volume)}</p>
          </div>
        ) : (
          <MinusIcon className="text-text-muted size-3" />
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onDelete(asset);
          }}
          className="p-1 hover:text-red-500 text-text-muted transition cursor-pointer"
        >
          <TrashIcon className="size-5" />
        </button>
      </div>
    </Link>
  );
}

function formatDollar(amount) {
  const num = Number(amount);

  if (isNaN(num)) return amount;

  if (Math.abs(num) >= 1000) {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  if (Math.abs(num) >= 1) {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  });
}

function formatDollarAbbrev(value) {
  if (value === null || value === undefined) return "-";

  const absValue = Math.abs(Number(value));

  if (absValue >= 1.0e12) {
    return (value / 1.0e12).toFixed(2) + "T";
  } else if (absValue >= 1.0e9) {
    return (value / 1.0e9).toFixed(2) + "B";
  } else if (absValue >= 1.0e6) {
    return (value / 1.0e6).toFixed(2) + "M";
  } else if (absValue >= 1.0e3) {
    return (value / 1.0e3).toFixed(2) + "K";
  } else {
    return value.toString();
  }
}
