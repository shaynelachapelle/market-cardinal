import {
  MinusIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/16/solid";
import { useAssetContext } from "../stores/AssetContext";

export default function AssetAbout() {
  const { details } = useAssetContext();

  const info = [
    { label: "Sector", value: details?.sector },
    { label: "Industry", value: details?.industry },
    { label: "CEO", value: details?.ceo },
    { label: "Website", value: details?.website, link: true },
    { label: "Headquarters", value: details?.city },
    { label: "Country", value: details?.country },
    { label: "IPO Date", value: details?.ipo_date || details?.ipoDate },
    {
      label: "Employees",
      value: formatDollarAbbrev(
        details?.employees || details?.fullTimeEmployees
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4 bg-bg px-8 py-4 mx-4 border border-border rounded-lg cursor-default">
      <h3 className="text-text mb-2 font-semibold text-xl">About</h3>
      <div className="flex flex-row xl:justify-between flex-wrap gap-6">
        {info.map(({ label, value, link }) => (
          <div key={label} className="flex flex-col gap-2 text-text">
            <p className="font-semibold">{label}</p>
            {!value ? (
              <MinusIcon className="size-6 text-text-muted" />
            ) : link ? (
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row gap-2 justify-center items-center text-xl hover:opacity-80 duration-200"
              >
                {value}
                <ArrowTopRightOnSquareIcon className="size-4" />
              </a>
            ) : (
              <p className="text-xl">{value}</p>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 text-text mt-2">
        <p className="font-semibold">Description</p>
        <p className="tracking-wide min-h-10">{details?.description}</p>
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
