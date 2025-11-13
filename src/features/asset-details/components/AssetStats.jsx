import { MinusIcon } from "@heroicons/react/16/solid";
import { useAssetContext } from "../stores/AssetContext";
import { formatDollarAbbrev } from "../../../utils/formatters";

export default function AssetStats() {
  const { details } = useAssetContext();

  return (
    <div className="flex flex-col gap-2 bg-bg px-3 py-4 md:px-8 mx-2 md:mx-4 border border-border rounded-lg cursor-default ">
      <h3 className="text-text mb-2 font-semibold text-xl">Stats</h3>
      <div className="flex flex-col md:flex-row gap-3 md:gap-20">
        <div className="flex flex-row justify-between items-center md:items-start md:flex-col gap-2 text-text">
          <p className="font-semibold">Market Capitalization</p>
          <div>
            {details?.market_cap ? (
              <div>
                <span className="text-base md:text-xl">
                  {formatDollarAbbrev(details?.market_cap)}{" "}
                </span>
                <span className="font-light text-xs">{details?.currency}</span>
              </div>
            ) : (
              <MinusIcon className="size-6 text-text-muted" />
            )}
          </div>
        </div>
        <div className="flex flex-row justify-between items-center md:items-start md:flex-col gap-2 text-text">
          <p className="font-semibold">Beta</p>
          {details?.beta ? (
            <p className="text-base md:text-xl">{details?.beta.toFixed(2)}</p>
          ) : (
            <MinusIcon className="size-6 text-text-muted" />
          )}
        </div>
        <div className="flex flex-row justify-between items-center md:items-start md:flex-col gap-2 text-text">
          <p className="font-semibold">Average Volume</p>
          <div>
            {details?.average_volume ? (
              <div>
                <span className="text-base md:text-xl">
                  {formatDollarAbbrev(details?.average_volume)}{" "}
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
