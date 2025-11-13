import { useState, useEffect } from "react";
import { supabase } from "../../../app/supabase-client";
import { useUser } from "../../../stores/UserContext";

export default function WatchlistModal({
  onClose,
  mode = "create",
  watchlist,
}) {
  const [name, setName] = useState(watchlist?.name || "");
  const [description, setDescription] = useState(watchlist?.description || "");
  const { user } = useUser();

  const MAX_LENGTH_NAME = 25;
  const MAX_LENGTH_DESC = 100;

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  async function handleSubmit() {
    if (!name.trim() || name.length > 50 || description.length > 150) return;

    if (mode === "create") {
      const { data, error } = await supabase
        .from("watchlists")
        .insert([
          { profile_id: user.id, name: name, description: description },
        ]);

      if (error) {
        console.log(error);
      } else {
        onClose();
      }
    } else if (mode === "edit" && watchlist) {
      const { error } = await supabase
        .from("watchlists")
        .update({ name, description })
        .eq("id", watchlist.id);

      if (error) {
        console.log(error);
      } else {
        onClose();
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center px-3 z-50">
      <div className="bg-bg p-6 rounded-xl border border-border shadow-lg w-full max-w-md">
        <h2 className="text-xl text-text mb-4 cursor-default ">
          {mode === "create" ? "Create New Watchlist" : "Edit Watchlist"}
        </h2>
        <label htmlFor="name" className="text-text-muted text-sm">
          Name
        </label>
        <input
          autoFocus
          required
          type="text"
          id="name"
          placeholder="Ex: Stocks"
          className="w-full mb-1 mt-1 p-2 text-text border border-border-muted hover:border-border focus:border-border rounded-lg bg-bg-light focus:outline-none focus:ring-0 duration-200"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={MAX_LENGTH_NAME}
        />
        <p className="text-text-muted text-xs font-light font-mono w-full text-right">
          {name.length} / {MAX_LENGTH_NAME}
        </p>
        <label htmlFor="description" className="text-text-muted text-sm">
          Description
        </label>
        <textarea
          id="description"
          placeholder="Description (optional)"
          className="w-full mt-1 p-2 text-text border border-border-muted rounded-lg bg-bg-light hover:border-border focus:border-border focus:outline-none focus:ring-0 duration-200"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={MAX_LENGTH_DESC}
        />
        <p className="mb-4 text-text-muted text-xs font-light font-mono w-full text-right">
          {description.length} / {MAX_LENGTH_DESC}
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded border border-border text-text-muted cursor-pointer hover:opacity-80 duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-3 py-1 rounded border border-border bg-black text-white cursor-pointer hover:opacity-80 duration-200"
          >
            {mode === "create" ? "Create" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
