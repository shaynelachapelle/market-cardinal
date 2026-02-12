import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  MinusIcon,
} from "@heroicons/react/16/solid";
import { formatDollar } from "../../../utils/formatters";
import { Link } from "react-router-dom";

export default function TickerItem({ asset }) {
  return (
    <Link
      to={`/assets/${asset.symbol}`}
      className={`flex items-center gap-2 text-green-500 cursor-pointer"
      }`}
    >
      {/* Arrow */}
      {asset.change > 0 ? (
        <ArrowTrendingUpIcon className="fill-green-500 size-4" />
      ) : asset.change < 0 ? (
        <ArrowTrendingDownIcon className="fill-red-500 size-4" />
      ) : (
        <MinusIcon className="text-text-muted size-3" />
      )}

      {/* Symbol + price */}
      <p className="font-bold text-text">{asset.symbol}</p>
      <p className="font-bold text-text">{formatDollar(asset.price)}</p>

      {/* Change */}
      <p
        className={
          asset.change > 0
            ? "text-green-500"
            : asset.change < 0
            ? "text-red-500"
            : "text-text-muted"
        }
      >
        <span>
          {asset.change > 0 ? "+" : ""}
          {formatDollar(asset.change)}{" "}
        </span>
        <span>
          ({asset.change > 0 ? "+" : ""}
          {asset.percent_change?.toFixed(2)}%)
        </span>
      </p>
    </Link>
  );
}
