import Dropdown from "../../components/Dropdown";
import { useTheme } from "../../stores/ThemeContext";
import WatchlistCard from "../../features/watchlist/components/WatchlistCard";
import PlusButton from "../../components/PlusButton";

export default function WatchlistPage() {
  const { theme } = useTheme();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4 px-2 md:px-4 min-h-screen">
      <div className="col-span-1 md:col-span-1 bg-bg shadow-md border border-border rounded-lg py-3 px-2 md:p-4">
        <div className="flex flex-row justify-between items-center mb-3 md:mb-4">
          <h2 className="w-full text-text pl-1 md:pl-0">Watchlists</h2>
          <PlusButton />
        </div>
        <div className="flex flex-col gap-4">
          <WatchlistCard />
        </div>
      </div>
      <div className="col-span-2 shadow-md bg-bg border border-border rounded-lg py-3 px-2 md:p-4">
        <div className="flex flex-row justify-between items-center mb-3 md:mb-4">
          <h2 className="w-full text-text pl-1 md:pl-0">Watchlist Name</h2>
          <PlusButton />
        </div>
      </div>
    </div>
  );
}
