import { useEffect, useState } from "react";
import { supabase } from "../../../app/supabase-client";
import { useWatchlistContext } from "../stores/WatchlistContext";

export default function useWatchlists(userId) {
  const { watchlists, setWatchlists } = useWatchlistContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    /*
    Reset watchlists when user signs out to prevent stale/old data 
    from being displayed
    */
    if (!userId) {
      setWatchlists([]);
      return;
    }

    let cancelled = false;

    async function fetchWatchlists() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("watchlists")
          .select("*")
          .eq("profile_id", userId);

        if (error) throw error;
        if (!cancelled) setWatchlists(data || []);
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (watchlists.length === 0) fetchWatchlists(); //already cached

    const channel = supabase
      .channel("watchlists-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "watchlists",
          filter: `profile_id=eq.${userId}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setWatchlists((prev) => [...prev, payload.new]);
          }
          if (payload.eventType === "UPDATE") {
            setWatchlists((prev) =>
              prev.map((wl) => (wl.id === payload.new.id ? payload.new : wl))
            );
          }
          if (payload.eventType === "DELETE") {
            setWatchlists((prev) =>
              prev.filter((wl) => wl.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return { watchlists, loading, error };
}
