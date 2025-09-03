import React from "react";
import { useTheme } from "../../../stores/ThemeContext";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

export default function WatchlistCard() {
  const { theme } = useTheme();
  return (
    <div
      className={`border border-border-muted bg-bg-light shadow-sm rounded-md py-3 px-2 md:p-4 hover:shadow-md transition cursor-pointer duration-200 ${
        theme === "dark"
          ? "shadow-white shadow-xs hover:shadow-sm"
          : "shadow-sm"
      }`}
    >
      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-row justify-center items-center gap-3 md:gap-4">
          <div className="flex flex-col text-left md:gap-1">
            <div className="flex flex-row text-text items-center gap-2">
              <h3 className="flex flex-row items-center gap-2 font-semibold">
                Name
              </h3>
            </div>

            <p className="truncate max-w-28 md:max-w-none md:whitespace-normal text-text-muted font-light text-sm">
              Description
            </p>
          </div>
        </div>

        <div className="flex flex-col text-right text-text font-mono">
          <EllipsisVerticalIcon className="rounded-xl text-text size-6 hover:scale-115 duration-400" />
        </div>
      </div>
    </div>
  );
}
