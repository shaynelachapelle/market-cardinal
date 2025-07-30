import React from "react";

function NewsCard({ article }) {
  const displayTime = timeAgo(article.published_at);

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-row justify-between items-start gap-4 border border-gray-300 shadow-sm rounded-md p-4 hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-col justify-between h-58">
        <div className="flex flex-col gap-3">
          <p className="rounded-full w-fit bg-gray-200 text-xs py-1 px-2">
            {article.entities[0].industry}
          </p>
          <h3 className="font-semibold text-lg max-w-xl">{article.title}</h3>
          <p className="text-gray-700 text-sm max-w-xl line-clamp-3 mt-1">
            {article.description}
          </p>
          <p className="text-gray-700 text-xs">{article.source}</p>
        </div>

        <div className="flex flex-col justify-between max-w-xl gap-4">
          <p className="flex flex-row items-center gap-2 text-gray-700 text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Zm7.75-4.25a.75.75 0 0 0-1.5 0V8c0 .414.336.75.75.75h3.25a.75.75 0 0 0 0-1.5h-2.5v-3.5Z"
                clipRule="evenodd"
              />
            </svg>
            {displayTime}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center h-full max-w-1/2">
        <img
          className="w-58 h-58 md:w-96 object-cover rounded-md"
          src={article.image_url}
          alt={article.title}
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

export default NewsCard;
