import React from "react";
import { formatDollar } from "../../../app/pages/AssetDetailsPage";
import { MinusIcon, TrashIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../../../stores/ThemeContext";
import { useAssetContext } from "../stores/AssetContext";

export default function AssetHeader() {
  const { theme } = useTheme();
  const { asset, symbol, loading, details } = useAssetContext();

  const normalizeTicker = (ticker) =>
    ticker?.endsWith("/USD") ? ticker.replace("/USD", "USD") : ticker;

  const logo =
    asset?.asset_type === "stocks" || asset?.asset_type === "ETFs"
      ? `https://img.logo.dev/ticker/${asset?.symbol}?token=${
          import.meta.env.VITE_LOGODEV_KEY
        }&size=128&retina=true&format=png&theme=${
          theme === "dark" ? "dark" : "light"
        }`
      : asset?.asset_type === "crypto"
      ? `https://img.logo.dev/crypto/${normalizeTicker(asset?.symbol)}?token=${
          import.meta.env.VITE_LOGODEV_KEY
        }&size=128&retina=true&format=png&theme=${
          theme === "dark" ? "dark" : "light"
        }`
      : null;

  return (
    <div className="flex flex-row gap-10 bg-bg p-8 mx-4 border border-border rounded-lg cursor-default">
      {loading ? (
        <div className="skeleton h-42 w-42 rounded-xl bg-text-muted"></div>
      ) : (
        <img src={logo} className="h-42 w-42 rounded-xl" />
      )}
      <div className="flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-3">
          {asset?.name && !loading ? (
            <h2 className="text-text font-semibold text-4xl">{asset?.name}</h2>
          ) : (
            <div className="skeleton w-100 h-6 bg-text rounded-xl"></div>
          )}
          {(asset?.name || symbol) && !loading ? (
            <h3 className="flex flex-row gap-4 text-text-muted font-semibold text-xl">
              {asset?.symbol || symbol}{" "}
              {details && (
                <span className="border border-border-muted bg-bg-light rounded px-1 text-lg">
                  {details?.exchange}
                </span>
              )}
            </h3>
          ) : (
            <div className="skeleton w-20 h-5 bg-text-muted rounded-xl"></div>
          )}
        </div>

        <div className="flex flex-row gap-5">
          {asset?.price && !loading ? (
            <div className="flex flex-row items-end gap-2 text-text">
              <p className="font-mono text-5xl">{formatDollar(asset?.price)}</p>
              <p>USD</p>
            </div>
          ) : !asset?.price && !loading ? (
            <MinusIcon className="text-text-muted size-8" />
          ) : (
            <div className="skeleton flex flex-row items-end gap-2">
              <div className="h-10 w-40 bg-text rounded-xl"></div>
              <div className="h-4 w-10 bg-text rounded-xl"></div>
            </div>
          )}

          {asset?.change && !loading ? (
            <p
              className={`flex items-end text-2xl h-full font-mono ${
                asset?.change > 0
                  ? "text-green-500"
                  : asset?.change < 0
                  ? "text-red-500"
                  : "text-text-muted"
              }`}
            >
              {asset?.change > 0
                ? `+${formatDollar(asset?.change)}`
                : formatDollar(asset?.change)}{" "}
              (
              {asset?.percent_change > 0
                ? `+${asset?.percent_change.toFixed(2)}`
                : asset?.percent_change.toFixed(2)}
              %)
            </p>
          ) : !asset?.change && !loading ? (
            <MinusIcon className="text-text-muted size-8" />
          ) : (
            <div className="flex items-end gap-2">
              <div className="skeleton w-20 h-6 bg-text rounded-xl"></div>
              <div className="skeleton w-20 h-6 bg-text rounded-xl"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
