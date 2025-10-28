import { PlusIcon } from "@heroicons/react/24/solid";

export default function PlusButton({ onClick, text, disabled, title }) {
  return (
    <button
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`group flex flex-row items-center rounded-xl p-1 border border-border duration-200
        ${
          disabled
            ? "opacity-50 cursor-not-allowed border-border-muted bg-bg-light"
            : "bg-bg-light hover:opacity-80 text-text cursor-pointer"
        }`}
    >
      {text ? (
        <div className="flex flex-row items-center justify-center gap-1">
          <span
            className={`whitespace-nowrap text-sm
              ${disabled ? "text-text-muted" : "text-text-muted"}`}
          >
            {text}
          </span>
          <PlusIcon
            className={`size-5 ${disabled ? "text-text-muted" : "text-text"}`}
          />
        </div>
      ) : (
        <PlusIcon
          className={`size-5 ${disabled ? "text-text-muted" : "text-text"}`}
        />
      )}
    </button>
  );
}
