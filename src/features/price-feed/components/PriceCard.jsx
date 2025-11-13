import { useTheme } from "../../../stores/ThemeContext";
import { useAssetCategory } from "../stores/AssetCategoryContext";
import { Link } from "react-router-dom";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  MinusIcon,
} from "@heroicons/react/16/solid";
import {
  normalizeTicker,
  formatDollar,
  formatDollarAbbrev,
} from "../../../utils/formatters";
import useLogo from "../../../hooks/useLogo";

export default function PriceCard({ asset }) {
  const { theme } = useTheme();
  const { assetCategory } = useAssetCategory();

  const logo = useLogo(asset);

  return (
    <Link
      to={`/assets/${normalizeTicker(asset.symbol)}`}
      state={{ asset }}
      className={`border border-border-muted bg-bg-light shadow-sm rounded-md py-3 px-2 md:p-4 hover:shadow-md transition cursor-pointer duration-200 ${
        theme === "dark"
          ? "shadow-white shadow-xs hover:shadow-sm"
          : "shadow-sm"
      }`}
    >
      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-row justify-center items-center gap-3 md:gap-4">
          <div className="flex w-8 h-8 bg-none">
            <img className="rounded-xl" src={logo} />
          </div>
          <div className="flex flex-col text-left md:gap-1">
            <h3 className="flex flex-row items-center gap-2 text-text font-semibold">
              <span>{asset.symbol}</span>
              {asset.change > 0 ? (
                <ArrowTrendingUpIcon className="fill-green-500 size-4" />
              ) : asset.change < 0 ? (
                <ArrowTrendingDownIcon className="fill-red-500 size-4" />
              ) : (
                <MinusIcon className="text-text-muted size-3" />
              )}
            </h3>
            <p className="truncate max-w-28 md:max-w-48 2xl:max-w-72 text-text-muted font-light text-sm">
              {asset.name}
            </p>
          </div>
        </div>

        <div className="flex flex-col text-right text-text font-mono">
          <h3 className="font-semibold">
            $
            {formatDollar(
              assetCategory === "Stocks" ? asset.price.toFixed(2) : asset.price
            )}
          </h3>
          <p
            className={`text-sm ${
              asset.change > 0
                ? "text-green-500"
                : asset.change < 0
                ? "text-red-500"
                : "text-text-muted"
            }`}
          >
            {asset.change > 0
              ? `+${formatDollar(asset.change)}`
              : formatDollar(asset.change)}{" "}
            (
            {asset.percent_change > 0
              ? `+${asset.percent_change.toFixed(2)}`
              : asset.percent_change.toFixed(2)}
            %)
          </p>
          <div className="hidden lg:block pt-1 text-text-muted text-xs">
            <p>Vol: ${formatDollarAbbrev(asset.volume)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
