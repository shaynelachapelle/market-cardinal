import React from "react";
import { Link } from "react-router-dom";
import PlusButton from "../../../components/PlusButton";
import WatchlistCard from "./WatchlistCard";
import WatchlistCardSkeleton from "./WatchlistCardSkeleton";

export default function WatchlistSidebar({
  loading,
  user,
  watchlists,
  selectedWatchlist,
  onSelectWatchlist,
  onCreateWatchlist,
}) {
  const skeletonCount = Math.floor(Math.random() * 5) + 2;
  const MAX_WATCHLISTS = 6;

  return (
    <div className="col-span-1 md:col-span-1 bg-bg shadow-md border border-border rounded-lg py-3 px-2 md:p-4">
      <div className="flex flex-row justify-between items-center mb-3 md:mb-4">
        <h2 className="w-full text-text pl-1 md:pl-0">
          Watchlists{" "}
          <span className="ml-2 text-text-muted bg-bg-light rounded-xl border p-1 px-2 border-border-muted text-sm font-mono cursor-default">
            {watchlists.length} / {MAX_WATCHLISTS}
          </span>
        </h2>
        <PlusButton
          onClick={onCreateWatchlist}
          text="Create Watchlist"
          disabled={watchlists.length >= MAX_WATCHLISTS}
          title={
            watchlists.length >= MAX_WATCHLISTS
              ? "Maximum watchlist count reached"
              : "Create a new watchlist"
          }
        />
      </div>

      <div
        className={`flex flex-col justify-center items-center gap-4 transition-opacity duration-200 ${
          loading ? "opacity-50" : "opacity-100"
        }`}
      >
        {loading ? (
          Array.from({ length: skeletonCount }).map((_, i) => (
            <WatchlistCardSkeleton key={i} />
          ))
        ) : !user ? (
          <p className="text-text-muted">
            <Link
              to="/auth"
              className="font-semibold text-primary hover:opacity-80 duration-200"
            >
              Sign in
            </Link>{" "}
            to manage watchlists...
          </p>
        ) : watchlists.length === 0 ? (
          <p className="text-text-muted">
            You don't have any watchlists yet. Click "Create Watchlist" to get
            started.
          </p>
        ) : (
          watchlists.map((watchlist) => (
            <WatchlistCard
              key={watchlist.id}
              watchlist={watchlist}
              onSelect={() => onSelectWatchlist(watchlist)}
              isSelected={selectedWatchlist?.id === watchlist.id}
            />
          ))
        )}
      </div>
    </div>
  );
}
