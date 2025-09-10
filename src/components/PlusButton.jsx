import React from "react";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function PlusButton({ onClick, text, disabled, title }) {
  return (
    <button
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`group flex flex-row items-center rounded-xl p-1 border duration-200
        ${
          disabled
            ? "opacity-50 cursor-not-allowed border-border-muted bg-bg-light"
            : "bg-bg-light border-border-muted hover:border-border text-text cursor-pointer"
        }`}
    >
      {text ? (
        <div className="flex flex-row items-center justify-center gap-1">
          <span
            className={`whitespace-nowrap text-sm
              ${
                disabled
                  ? "text-text-muted"
                  : "text-text-muted group-hover:text-text"
              }`}
          >
            {text}
          </span>
          <PlusIcon className={`size-5 ${disabled ? "text-text-muted" : ""}`} />
        </div>
      ) : (
        <PlusIcon className={`size-5 ${disabled ? "text-text-muted" : ""}`} />
      )}
    </button>
  );
}
