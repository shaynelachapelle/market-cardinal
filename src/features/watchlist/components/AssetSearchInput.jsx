import { useState, useEffect } from "react";
import { supabase } from "../../../app/supabase-client";
import {
  XMarkIcon,
  PlusIcon,
  TrashIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/16/solid";
import { useUser } from "../../../stores/UserContext";
import { DEFAULT_TICKERS } from "../../../config/variables";
import useLogo from "../../../hooks/useLogo";
import { formatAssetType } from "../../../utils/formatters";

export default function AssetSearchInput({ onClose, watchlist }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(DEFAULT_TICKERS);
  const { user } = useUser();
  const [existingAssets, setExistingAssets] = useState([]);

  useEffect(() => {
    /*
    Collect existing assets in selected watchlist in order to provide
    user the option of removing existing assets within the search component
    */
    async function fetchExistingAssets() {
      const { data, error } = await supabase
        .from("watchlist_assets")
        .select("asset_symbol")
        .eq("watchlist_id", watchlist.id);

      if (!error) {
        setExistingAssets(data.map((row) => row.asset_symbol));
      }
    }

    fetchExistingAssets();
  }, [watchlist.id]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  function highlightMatch(text, query) {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "i");
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="text-primary">
          {part}
        </span>
      ) : (
        part
      )
    );
  }

  async function addAsset(asset) {
    const { error } = await supabase.from("watchlist_assets").insert({
      watchlist_id: watchlist.id,
      asset_symbol: asset.symbol,
      profile_id: user.id,
    });

    if (error) {
      console.log(error);
    } else {
      setExistingAssets((prev) => [...prev, asset.symbol]);
    }
  }

  async function removeAsset(asset) {
    const { error } = await supabase
      .from("watchlist_assets")
      .delete()
      .eq("watchlist_id", watchlist.id)
      .eq("asset_symbol", asset.symbol);

    if (error) {
      console.log(error);
    } else {
      setExistingAssets((prev) => prev.filter((sym) => sym !== asset.symbol));
    }
  }

  /*
  Display default tickers when no assets are being searched to improve UX
  */
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.length > 0) {
        const matches = await searchAssets(query);
        setResults(matches);
      } else {
        setResults(DEFAULT_TICKERS);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  async function searchAssets(q) {
    const { data, error } = await supabase
      .from("prices")
      .select("symbol, name, asset_type")
      .or(`symbol.ilike.%${q}%, name.ilike.%${q}%`)
      .limit(10);
    return error ? [] : data;
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-bg p-6 pt-4 rounded-xl border border-border shadow-lg w-full max-w-2xl">
        <h2 className="flex flex-row items-center justify-between text-xl text-text mb-6 cursor-default ">
          <span>Add symbol(s) </span>
          <XMarkIcon
            onClick={onClose}
            className="size-8 text-text top-5 right-5 cursor-pointer hover:opacity-80 duration-200"
          />
        </h2>
        <div className="relative w-full">
          <div className="flex flex-row">
            <input
              autoFocus
              className="border border-border w-full rounded-xl bg-bg-light p-1 px-2 text-text focus:outline-none focus:ring-0 transition-colors duration-400"
              type="text"
              placeholder="Search symbols..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            ></input>
            <MagnifyingGlassIcon className="absolute right-2 top-2 size-5 text-text/50" />
          </div>

          <div className="flex justify-center mt-2 w-full rounded-xl bg-bg border border-border-muted h-80 overflow-y-auto">
            {results.length === 0 ? (
              <p className="text-text-muted mt-4">No results found.</p>
            ) : (
              <ul className="w-full">
                {results.map((item, index) => (
                  <li
                    key={index}
                    className={`flex flex-row border-b border-border-muted hover:bg-bg-light text-text px-4 py-2 cursor-default gap-2 
                      ${index === 0 ? "rounded-t-xl" : ""} ${
                      index === results.length - 1
                        ? "rounded-b-xl border-none"
                        : ""
                    }`}
                  >
                    <div className="flex flex-row justify-between w-full mr-2">
                      <span className="flex flex-row items-center font-semibold">
                        <div className="flex rounded-xl w-6 h-6 bg-none mr-3">
                          <img className="rounded-xl" src={useLogo(item)} />
                        </div>
                        <span className="w-20">
                          {highlightMatch(item.symbol, query)}
                        </span>
                        <span className="truncate max-w-32 md:max-w-64 font-normal ml-4">
                          {highlightMatch(item.name, query)}
                        </span>
                      </span>
                      <span className="text-text-muted">
                        {formatAssetType(item.asset_type)}
                      </span>
                    </div>
                    {existingAssets.includes(item.symbol) ? (
                      <TrashIcon
                        onClick={() => removeAsset(item)}
                        className="text-text size-6 cursor-pointer hover:text-red-500 duration-200"
                      />
                    ) : (
                      <PlusIcon
                        onClick={() => addAsset(item)}
                        className="text-text size-6 cursor-pointer hover:text-primary duration-200"
                      />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
