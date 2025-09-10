import { createContext, useContext, useState, useEffect } from "react";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [selectedWatchlist, setSelectedWatchlist] = useState(null);

  // All watchlists for the signed-in user
  const [watchlists, setWatchlists] = useState([]);

  // Assets, keyed by watchlist id
  const [watchlistAssets, setWatchlistAssets] = useState({});

  // Restore persisted selected watchlist
  useEffect(() => {
    const saved = localStorage.getItem("selectedWatchlist");
    if (saved) {
      setSelectedWatchlist(JSON.parse(saved));
    }
  }, []);

  // Persist selected watchlist
  useEffect(() => {
    if (selectedWatchlist) {
      localStorage.setItem(
        "selectedWatchlist",
        JSON.stringify(selectedWatchlist)
      );
    } else {
      localStorage.removeItem("selectedWatchlist");
    }
  }, [selectedWatchlist]);

  return (
    <WatchlistContext.Provider
      value={{
        selectedWatchlist,
        setSelectedWatchlist,
        watchlists,
        setWatchlists,
        watchlistAssets,
        setWatchlistAssets,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlistContext() {
  return useContext(WatchlistContext);
}
