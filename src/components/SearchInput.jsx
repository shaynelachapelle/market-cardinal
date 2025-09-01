import { useState, useEffect, useRef } from "react";
import { supabase } from "../app/supabase-client";
import { useTheme } from "./ThemeContext";
import { Link } from "react-router-dom";

export default function SearchInput() {
  const { theme } = useTheme();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const wrapperRef = useRef(null);

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
        <span
          key={i}
          className={`${
            theme === "dark" ? "text-yellow-500" : "text-blue-600"
          }`}
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  }

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.length > 0) {
        const matches = await searchAssets(query);
        setResults(matches);
      } else {
        setResults([]);
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

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setResults([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-fit">
      <div className="relative flex flex-row">
        <input
          className="border rounded-2xl bg-gray-200 p-1 px-2 text-black focus:outline-none hover:placeholder-black focus:ring-0 transition-colors duration-400"
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

      {results.length > 0 && (
        <ul className="absolute mt-1 py-1 w-screen md:w-xl -right-7 md:right-0 rounded-xl bg-bg shadow-lg border border-border max-h-60 overflow-y-auto z-10">
          {results.map((item, index) => (
            <Link to={`/assets/${normalizeTicker(item.symbol)}`}>
              <li
                key={index}
                className={`flex flex-row justify-between border-b border-border-muted hover:bg-bg-light text-text px-4 py-2 cursor-pointer gap-2 ${
                  index === 0 ? "rounded-t-xl" : ""
                } ${
                  index === results.length - 1 ? "rounded-b-xl border-none" : ""
                }`}
              >
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
              </li>
            </Link>
          ))}
        </ul>
      )}
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
