import { useTheme } from "../../../stores/ThemeContext";
import { TrashIcon } from "@heroicons/react/16/solid";

export default function WatchlistAssetCardSkeleton() {
  const { theme } = useTheme();

  return (
    <div
      className={`skeleton w-full border border-border-muted bg-bg-light shadow-sm rounded-md py-3 px-2 md:p-4 hover:shadow-md transition cursor-pointer duration-200 ${
        theme === "dark"
          ? "shadow-white shadow-xs hover:shadow-sm"
          : "shadow-sm"
      }`}
    >
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-row justify-start items-center w-60 gap-3 md:gap-4">
          <div className="flex w-8 h-8 bg-text rounded-xl"></div>
          <div className="flex flex-col text-left md:gap-3">
            <h3 className="flex flex-row h-4 w-15 rounded items-center gap-2 bg-text font-semibold"></h3>
            <p className="bg-text-muted h-3 w-30 rounded"></p>
          </div>
        </div>

        <h3 className="bg-text h-4 w-20 rounded"></h3>

        <p className={`bg-text h-4 w-10 rounded`}></p>

        <p className={`bg-text h-4 w-10 rounded`}></p>

        <div className="hidden md:block h-4 w-34 bg-text rounded">
          <p></p>
        </div>

        <button className="p-1 text-text-muted transition cursor-pointer">
          <TrashIcon className="size-5" />
        </button>
      </div>
    </div>
  );
}
