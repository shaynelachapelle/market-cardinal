import React from "react";
import { useTheme } from "../../../stores/ThemeContext";

function PriceCardSkeleton() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={`border border-border-muted skeleton h-[70px] md:h-[98px] bg-bg-light shadow-sm rounded-md py-3 px-2 md:p-4 hover:shadow-md transition cursor-pointer duration-200 ${
        theme === "dark"
          ? "shadow-white shadow-xs hover:shadow-sm"
          : "shadow-sm"
      }`}
    >
      <div className="flex flex-row justify-between gap-4 skeleton">
        <div className="flex flex-row justify-center  items-center gap-3 md:gap-4">
          <div className="flex w-8 h-8 bg-text-muted rounded-xl"></div>
          <div className="flex flex-col text-left md:gap-1">
            <h3 className="flex h-4 w-15 rounded flex-row items-center gap-2 bg-text font-semibold"></h3>
            <p className="bg-text-muted h-3 w-30 rounded font-light text-sm mt-1"></p>
          </div>
        </div>

        <div className="flex flex-col text-right items-end gap-2 font-mono">
          <h3 className="h-3 w-9 md:w-15 bg-text font-semibold rounded"></h3>
          <p className="bg-text-muted h-3 w-14 md:w-30 rounded"></p>
          <div className="bg-text-muted h-2 w-12 md:w-20 rounded text-xs">
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceCardSkeleton;
