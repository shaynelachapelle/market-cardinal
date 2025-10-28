import { useTheme } from "../../../stores/ThemeContext";

export default function NewsCardSkeleton() {
  const { theme } = useTheme();

  return (
    <div
      className={`flex flex-col md:flex-row max-w-full skeleton justify-between items-start gap-4 bg-bg-light shadow-sm rounded-md p-4 hover:shadow-md transition duration-200 cursor-pointer ${
        theme === "dark"
          ? "shadow-white shadow-xs hover:shadow-sm"
          : "shadow-sm"
      }`}
    >
      <div className="flex flex-col justify-between h-58 w-full skeleton">
        <div className="flex flex-col gap-3">
          <div className="max-w-2xl h-4 rounded bg-text"></div>
          <div className="h-4 rounded text-sm bg-text-muted max-w-3/4 mt-2"></div>
          <div className="h-4 rounded text-sm bg-text-muted max-w-1/2"></div>
          <div className="h-4 rounded text-sm bg-text-muted max-w-1/4"></div>

          <div className="bg-text-muted h-2 w-40 rounded font-light text-xs mt-4"></div>
        </div>

        <div className="flex flex-col justify-between max-w-xl gap-4">
          <div className="flex flex-row items-center gap-2 text-text-muted font-light text-xs">
            <div className="h-4 w-4 bg-text-muted rounded-full"></div>
            <div className="w-20 h-2 bg-text-muted rounded"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center h-full max-w-full md:max-w-1/2">
        <div className="w-full h-58 md:w-96 rounded-md bg-text-muted"></div>
      </div>
    </div>
  );
}
