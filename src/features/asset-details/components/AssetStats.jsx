import React from "react";
import { MinusIcon } from "@heroicons/react/16/solid";
import { useAssetContext } from "../stores/AssetContext";

export default function AssetStats() {
  const { details } = useAssetContext();

  return (
    <div className="flex flex-col gap-2 bg-bg px-8 py-4 mx-4 border border-border rounded-lg cursor-default ">
      <h3 className="text-text mb-2 font-semibold text-xl">Stats</h3>
      <div className="flex flex-row gap-20">
        <div className="flex flex-col gap-2 text-text">
          <p className="font-semibold">Market Capitalization</p>
          <div>
            {details?.market_cap || details?.marketCap ? (
              <div>
                <span className="text-xl">
                  {formatDollarAbbrev(
                    details?.market_cap || details?.marketCap
                  )}{" "}
                </span>
                <span className="font-light text-xs">{details?.currency}</span>
              </div>
            ) : (
              <MinusIcon className="size-6 text-text-muted" />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 text-text">
          <p className="font-semibold">Beta</p>
          {details?.beta ? (
            <p className="text-xl">{details?.beta}</p>
          ) : (
            <MinusIcon className="size-6 text-text-muted" />
          )}
        </div>
        <div className="flex flex-col gap-2 text-text">
          <p className="font-semibold">Average Volume</p>
          <div>
            {details?.averageVolume || details?.average_volume ? (
              <div>
                <span className="text-xl">
                  {formatDollarAbbrev(
                    details?.averageVolume || details?.average_volume
                  )}{" "}
                </span>
              </div>
            ) : (
              <MinusIcon className="size-6 text-text-muted" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function formatDollarAbbrev(value) {
  if (value === null || value === undefined) return "-";

  const absValue = Math.abs(Number(value));

  if (absValue >= 1.0e12) {
    return (value / 1.0e12).toFixed(2) + " T";
  } else if (absValue >= 1.0e9) {
    return (value / 1.0e9).toFixed(2) + " B";
  } else if (absValue >= 1.0e6) {
    return (value / 1.0e6).toFixed(2) + " M";
  } else if (absValue >= 1.0e3) {
    return (value / 1.0e3).toFixed(2) + " K";
  } else {
    return value.toString();
  }
}
