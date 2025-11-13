import { useState } from "react";
import { useTheme } from "../../../stores/ThemeContext";
import { ClockIcon } from "@heroicons/react/16/solid";

export default function NewsCard({ article }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const displayTime = timeAgo(article.published_at);
  const { theme } = useTheme();

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex flex-col md:flex-row justify-between items-start gap-4 bg-bg-light border border-border-muted shadow-sm rounded-md p-4 hover:shadow-md transition duration-200 cursor-pointer ${
        theme === "dark"
          ? "shadow-white shadow-xs hover:shadow-sm"
          : "shadow-sm"
      }`}
    >
      <div className="flex flex-col justify-between gap-8 md:gap-6 md:h-58">
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-text text-lg max-w-xl line-clamp-3">
            {article.title}
          </h3>
          <p className="text-sm text-text-muted max-w-xl line-clamp-3 mt-1">
            {article.description}
          </p>
        </div>

        <div className="pb-1 md:pb-0 flex flex-row md:flex-col justify-between max-w-xl gap-4 h-full">
          <p className="text-text-muted font-light text-xs">{article.source}</p>
          <p className="flex flex-row items-center gap-2 text-text-muted font-light text-xs opacity-80">
            <ClockIcon className="size-4" />
            {displayTime}
          </p>
        </div>
      </div>
      <div className="relative flex flex-col items-end justify-center h-full min-w-full max-w-full md:max-w-1/2 md:min-w-1/2">
        {!imageLoaded && (
          <div className="absolute right-0 h-58 md:max-w-96 lg:w-xl rounded-md bg-text-muted skeleton"></div>
        )}
        <img
          className={`h-58 w-full md:max-w-96 lg:w-xl object-cover rounded-md transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          src={article.image}
          alt={article.title}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
    </a>
  );
}

function timeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now - past;

  const minutes = Math.floor(diffMs / (1000 * 60));
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;

  const weeks = Math.floor(days / 7);
  return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
}
