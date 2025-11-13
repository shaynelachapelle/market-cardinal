import PlusButton from "../../../components/PlusButton";
import WatchlistAssetCard from "./WatchlistAssetCard";
import WatchlistAssetCardSkeleton from "./WatchlistAssetCardSkeleton";

export default function AssetList({
  loading,
  user,
  selectedWatchlist,
  assets,
  onAddAsset,
  onDeleteAsset,
}) {
  const skeletonCount = Math.floor(Math.random() * 8) + 3;
  const MAX_ASSETS = 20;

  return (
    <div className="lg:col-span-2 shadow-md bg-bg border border-border rounded-lg py-3 px-2 md:p-4">
      <div className="flex flex-row justify-between items-center mb-3 md:mb-4">
        <h2 className="w-full text-text pl-1 md:pl-0">
          {selectedWatchlist ? selectedWatchlist.name : "Select a watchlist"}
          {selectedWatchlist && (
            <span className="ml-2 text-text-muted bg-bg-light rounded-xl border p-1 px-2 border-border-muted text-sm font-mono cursor-default">
              {assets.length} / {MAX_ASSETS}
            </span>
          )}
        </h2>
        <PlusButton
          onClick={onAddAsset}
          text="Add symbol"
          disabled={!selectedWatchlist || assets.length >= MAX_ASSETS}
          title={
            selectedWatchlist
              ? "Add symbol(s) to watchlist"
              : assets.length >= MAX_ASSETS
              ? "Watchlist capacity reached"
              : "Select a watchlist"
          }
        />
      </div>

      <div
        className={`flex flex-col items-center text-center gap-4 w-full transition-opacity duration-200 ${
          loading && assets.length > 0 ? "opacity-50" : "opacity-100"
        }`}
      >
        {loading && assets.length > 0 ? (
          Array.from({ length: skeletonCount }).map((_, i) => (
            <WatchlistAssetCardSkeleton key={i} />
          ))
        ) : !selectedWatchlist ? (
          <p className="text-text-muted">
            Select a watchlist to view its assets.
          </p>
        ) : assets.length === 0 ? (
          <p className="text-text-muted">
            This watchlist is empty. Add assets to start tracking them.
          </p>
        ) : (
          assets.map((asset) => (
            <WatchlistAssetCard
              key={asset.asset_symbol}
              asset={asset.prices}
              onDelete={onDeleteAsset}
            />
          ))
        )}
      </div>
    </div>
  );
}
