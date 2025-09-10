import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../../../stores/ThemeContext";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

export default function WatchlistCardSkeleton() {
  const { theme } = useTheme();
  return (
    <div
      className={`skeleton w-full border border-border-muted bg-bg-light shadow-sm rounded-md py-3 px-2 md:p-4 hover:shadow-md transition cursor-pointer duration-200 ${
        theme === "dark"
          ? "shadow-white shadow-xs hover:shadow-sm"
          : "shadow-sm"
      }`}
    >
      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-row justify-center items-center gap-3 md:gap-4">
          <div className="flex flex-col text-left md:gap-2">
            <div className="flex flex-row w-20 h-3 skeleton rounded bg-text items-center gap-2"></div>
            <p className="w-60 h-4 skeleton rounded bg-text-muted font-light text-sm"></p>
          </div>
        </div>

        <div className="relative">
          <EllipsisVerticalIcon className="size-6 text-text skeleton cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
