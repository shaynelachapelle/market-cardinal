import { useState, useEffect } from "react";
import { useTheme } from "../../stores/ThemeContext";
import WatchlistModal from "../../features/watchlist/components/WatchlistModal";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../stores/UserContext";
import { supabase } from "../supabase-client";
import AssetSearchInput from "../../features/watchlist/components/AssetSearchInput";
import AssetList from "../../features/watchlist/components/AssetList";
import WatchlistSidebar from "../../features/watchlist/components/WatchlistSidebar";
import useWatchlists from "../../features/watchlist/hooks/useWatchlists";
import useWatchlistAssets from "../../features/watchlist/hooks/useWatchlistAssets";
import {
  WatchlistProvider,
  useWatchlistContext,
} from "../../features/watchlist/stores/WatchlistContext";

export default function WatchlistPage() {
  const { selectedWatchlist, setSelectedWatchlist } = useWatchlistContext();
  const { theme } = useTheme();
  const { user } = useUser();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);

  const { watchlists, loading: wlLoading } = useWatchlists(user?.id);
  const { assets, loading: assetsLoading } = useWatchlistAssets(
    user?.id,
    selectedWatchlist?.id
  );

  useEffect(() => {
    if (!wlLoading) {
      if (watchlists.length === 0) {
        setSelectedWatchlist(null);
      } else if (
        selectedWatchlist &&
        !watchlists.some((wl) => wl.id === selectedWatchlist.id)
      ) {
        setSelectedWatchlist(watchlists[0]);
      }
    }
  }, [watchlists, wlLoading, selectedWatchlist, setSelectedWatchlist]);

  async function handleDeleteAsset(asset) {
    const { error } = await supabase
      .from("watchlist_assets")
      .delete()
      .eq("watchlist_id", selectedWatchlist.id)
      .eq("asset_symbol", asset.symbol);

    if (error) {
      console.error("Error deleting asset:", error.message);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4 px-2 md:px-4 min-h-screen">
      <WatchlistSidebar
        loading={wlLoading}
        user={user}
        watchlists={watchlists}
        selectedWatchlist={selectedWatchlist}
        onSelectWatchlist={setSelectedWatchlist}
        onCreateWatchlist={() =>
          user ? setIsModalOpen(true) : navigate("/auth")
        }
      />

      <AssetList
        loading={assetsLoading}
        user={user}
        selectedWatchlist={selectedWatchlist}
        assets={assets}
        onAddAsset={() =>
          user ? setIsAssetModalOpen(true) : navigate("/auth")
        }
        onDeleteAsset={handleDeleteAsset}
      />

      {isModalOpen && (
        <WatchlistModal mode="create" onClose={() => setIsModalOpen(false)} />
      )}

      {isAssetModalOpen && (
        <AssetSearchInput
          onClose={() => setIsAssetModalOpen(false)}
          watchlist={selectedWatchlist}
        />
      )}
    </div>
  );
}
