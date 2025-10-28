import { useState, useEffect, useRef } from "react";
import { supabase } from "../app/supabase-client";
import { Link } from "react-router-dom";
import useLogo from "../hooks/useLogo";
import { normalizeTicker, formatAssetType } from "../utils/formatters";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import Spinner from "./Spinner";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

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

  /*
  Limit calls to database to every 300ms for queries longer than 1 character to reduce load on db 
  */
  useEffect(() => {
    if (query.length > 1) {
      setShowDropdown(true);
      setLoading(true);
      const delayDebounce = setTimeout(async () => {
        const matches = await searchAssets(query);
        setResults(matches);
        setLoading(false);
      }, 300);
      return () => clearTimeout(delayDebounce);
    } else {
      setResults([]);
      setShowDropdown(false);
    }
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
        setQuery("");
        setShowDropdown(false);
        setLoading(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  /*
  Prevent background scrolling while search results are displayed to improve UX
  */
  useEffect(() => {
    if (showDropdown) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showDropdown]);

  return (
    <div ref={wrapperRef} className="relative w-fit">
      <div className="relative flex flex-row">
        <input
          className="border border-border-muted rounded-2xl bg-bg-light p-1 px-2 text-text focus:outline-none hover:border-border focus:border-border focus:ring-0 transition-colors duration-400"
          type="text"
          placeholder="Search symbols..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></input>
        <MagnifyingGlassIcon className="absolute right-2 top-2 size-5 fill-text/50" />
      </div>

      {showDropdown && (
        <div className="absolute mt-1 py-1 w-screen md:w-xl -right-7 md:right-0 rounded-xl bg-bg shadow-lg border border-border max-h-60 overflow-y-auto z-10">
          {results.length > 0 ? (
            <ul>
              {results.map((item, index) => (
                <Link
                  key={index}
                  to={`/assets/${normalizeTicker(item.symbol)}`}
                  state={{ item }}
                  onClick={() => {
                    setQuery("");
                    setResults([]);
                  }}
                >
                  <li
                    className={`flex flex-row justify-between border-b border-border-muted hover:bg-bg-light text-text px-4 py-2 cursor-pointer gap-2 ${
                      index === 0 ? "rounded-t-xl" : ""
                    } ${
                      index === results.length - 1
                        ? "rounded-b-xl border-none"
                        : ""
                    }`}
                  >
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
                  </li>
                </Link>
              ))}
            </ul>
          ) : loading ? (
            <div className="flex items-center gap-2 px-4 py-2 text-text-muted">
              <div className="size-5">
                <Spinner />
              </div>
              Searching...
            </div>
          ) : (
            <div className="px-4 py-2 text-text-muted">No results found.</div>
          )}
        </div>
      )}
    </div>
  );
}
