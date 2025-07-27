import React from "react";

function NewsCard({ article }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-row justify-between items-start gap-4 border border-gray-300 shadow-sm rounded-md p-4 hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-col gap-4">
        {/*
        <p className="rounded-full w-fit bg-gray-200 text-xs py-1 px-2">
          {article.category}
        </p>
        */}

        <h3 className="font-semibold text-lg max-w-xl">{article.title}</h3>
        <p className="text-gray-700 text-sm max-w-xl">{article.description}</p>
        <p className="text-gray-700 text-xs">{article.source}</p>
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <img
          className="w-48 h-48 object-cover rounded-md"
          src={article.image_url}
          alt={article.title}
        />
      </div>
    </a>
  );
}

export default NewsCard;
