import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../../../stores/ThemeContext";
import {
  EllipsisVerticalIcon,
  TrashIcon,
  PencilSquareIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import { supabase } from "../../../app/supabase-client";
import { useUser } from "../../../stores/UserContext";
import WatchlistModal from "./WatchlistModal";

export default function WatchlistCard({ watchlist, onSelect, isSelected }) {
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function onDelete(watchlist) {
    const { error } = await supabase
      .from("watchlists")
      .delete()
      .eq("id", watchlist.id);

    if (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      onClick={onSelect}
      className={`border w-full shadow-sm rounded-md py-3 px-2 md:p-4 hover:shadow-md transition cursor-pointer duration-200 ${
        theme === "dark"
          ? "shadow-white shadow-xs hover:shadow-sm"
          : "shadow-sm"
      } ${
        isSelected
          ? "border-border bg-bg-dark"
          : "border-border-muted bg-bg-light"
      }`}
    >
      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-row justify-center items-center gap-3 md:gap-4">
          <div className="flex flex-col text-left md:gap-1">
            <div className="flex flex-row text-text items-center gap-2">
              <h3 className="flex flex-row items-center gap-2 font-semibold">
                {watchlist.name}
              </h3>
            </div>
            {watchlist.description ? (
              <p className="truncate max-w-28 md:max-w-none md:whitespace-normal text-text-muted font-light text-sm">
                {watchlist.description}
              </p>
            ) : (
              <MinusIcon className="text-text-muted mt-1 size-4" />
            )}
          </div>
        </div>

        <div ref={menuRef} className="relative">
          <EllipsisVerticalIcon
            className="size-6 text-text cursor-pointer hover:scale-110 transition"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setIsMenuOpen((prev) => !prev);
            }}
          />

          <div
            className={`absolute right-0 mt-2 w-28 bg-bg-light border border-border rounded-md shadow-lg z-20 transform transition-all duration-200 origin-top ${
              isMenuOpen
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsMenuOpen(false);
                setIsModalOpen(true);
              }}
              className="flex flex-row justify-between items-center w-full text-left px-3 py-2 text-sm text-text-muted hover:text-text border-b border-border-muted duration-200 rounded-t-md cursor-pointer hover:bg-bg-light"
            >
              Edit
              <PencilSquareIcon className="size-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsMenuOpen(false);
                onDelete(watchlist);
              }}
              className="flex flex-row justify-between items-center w-full text-left px-3 py-2 text-sm rounded-b-md cursor-pointer text-red-600 hover:text-red-500 duration-200 hover:bg-bg-light"
            >
              Delete
              <TrashIcon className="size-5" />
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <WatchlistModal
          mode="edit"
          watchlist={watchlist}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
