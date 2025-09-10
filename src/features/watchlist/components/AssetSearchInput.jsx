import { useState, useEffect } from "react";
import { supabase } from "../../../app/supabase-client";
import { useTheme } from "../../../stores/ThemeContext";
import { XMarkIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useUser } from "../../../stores/UserContext";
import { DEFAULT_TICKERS } from "../../../config/variables";

export default function AssetSearchInput({ onClose, watchlist }) {
  const { theme } = useTheme();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(DEFAULT_TICKERS);
  const { user } = useUser();
  const [existingAssets, setExistingAssets] = useState([]);

  useEffect(() => {
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

  function fetchLogo(asset) {
    if (asset.asset_type === "stocks" || asset.asset_type === "ETFs") {
      return `https://img.logo.dev/ticker/${asset.symbol}?token=${
        import.meta.env.VITE_LOGODEV_KEY
      }&size=128&retina=true&format=png&theme=${
        theme === "dark" ? "dark" : "light"
      }`;
    } else if (asset.asset_type === "crypto") {
      return `https://img.logo.dev/crypto/${normalizeTicker(
        asset.symbol
      )}?token=${
        import.meta.env.VITE_LOGODEV_KEY
      }&size=128&retina=true&format=png&theme=${
        theme === "dark" ? "dark" : "light"
      }`;
    }
    return "";
  }

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
          Add symbol(s){" "}
          <XMarkIcon
            onClick={onClose}
            className="size-6 text-text top-5 right-5 cursor-pointer"
          />
        </h2>
        <div className="relative w-full">
          <div className="flex flex-row">
            <input
              autoFocus
              className="border w-full rounded-xl bg-gray-200 p-1 px-2 text-black focus:outline-none focus:ring-0  hover:placeholder-black transition-colors duration-400"
              type="text"
              placeholder="Search symbols..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            ></input>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="gray-400"
              className="absolute right-2 top-2 size-5"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className="flex justify-center mt-2 w-full rounded-xl bg-bg border border-border-muted h-80 overflow-y-auto">
            {results.length === 0 ? (
              <p className="text-text-muted mt-4">No results found.</p>
            ) : (
              <ul className="w-full">
                {results.map((item, index) => (
                  <li
                    key={index}
                    className={`flex flex-row border-b border-border-muted hover:bg-bg-light text-text px-4 py-2 cursor-default gap-2 ${
                      index === 0 ? "rounded-t-xl" : ""
                    } ${
                      index === results.length - 1
                        ? "rounded-b-xl border-none"
                        : ""
                    }`}
                  >
                    <div className="flex flex-row justify-between w-full mr-2">
                      <span className="flex flex-row items-center font-semibold">
                        <div className="flex rounded-xl w-6 h-6 bg-none mr-3">
                          <img className="rounded-xl" src={fetchLogo(item)} />
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

function formatAssetType(type) {
  return type[type.length - 1] === "s"
    ? type.slice(0, -1).toUpperCase()
    : type.toUpperCase();
}

function normalizeTicker(ticker) {
  return ticker.endsWith("/USD") ? ticker.replace("/USD", "USD") : ticker;
}
