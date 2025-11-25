import { useState } from "react";
import {
  MinusIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/16/solid";
import { useAssetContext } from "../stores/AssetContext";
import { formatDollarAbbrev } from "../../../utils/formatters";

export default function AssetAbout() {
  const { details } = useAssetContext();
  const [showMore, setShowMore] = useState(false);

  const MAX_CHAR_COUNT = 350;

  /*
  TODO: Change fields displayed to user based on asset type to improve UX 
  */
  const info = [
    { label: "Sector", value: details?.sector },
    { label: "Industry", value: details?.industry },
    { label: "CEO", value: details?.ceo },
    { label: "Website", value: details?.website, link: true },
    { label: "Headquarters", value: details?.city },
    { label: "Country", value: details?.country },
    { label: "IPO Date", value: details?.ipo_date },
    {
      label: "Employees",
      value: formatDollarAbbrev(details?.employees),
    },
  ];

  function handleClick() {
    setShowMore(!showMore);
  }

  return (
    <div className="flex flex-col gap-4 bg-bg px-3 py-4 md:px-8 mx-2 md:mx-4 border border-border rounded-lg cursor-default">
      <h3 className="text-text mb-2 font-semibold text-xl">About</h3>
      <div className="flex flex-col lg:flex-row xl:justify-between flex-wrap gap-3 md:gap-5">
        {info.map(({ label, value, link }) => (
          <div
            key={label}
            className="flex flex-row justify-between items-center lg:items-start lg:flex-col gap-2 text-text"
          >
            <p className="font-semibold">{label}</p>
            {!value ? (
              <MinusIcon className="size-4 text-text-muted" />
            ) : link ? (
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row gap-2 justify-center items-center text-base truncate max-w-60 md:max-w-none md:text-xl text-primary hover:opacity-80 duration-200"
              >
                <span className="truncate max-w-100">{value}</span>
                <ArrowTopRightOnSquareIcon className="size-4" />
              </a>
            ) : (
              <p className="text-base truncate max-w-60 md:max-w-none md:text-xl">
                {value}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 text-text mt-2">
        <p className="font-semibold">Description</p>
        <p className="tracking-wide min-h-10">
          <span className={`${showMore ? "line-clamp-none" : "line-clamp-3"}`}>
            {details?.description}
          </span>
          {details?.description.length > MAX_CHAR_COUNT && (
            <button
              onClick={handleClick}
              className="text-primary font-medium hover:opacity-80 duration-200 cursor-pointer"
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
          )}
        </p>
      </div>
    </div>
  );
}
