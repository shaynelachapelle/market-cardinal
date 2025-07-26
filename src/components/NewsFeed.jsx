import React from "react";
import { useState, useEffect } from "react";
import NewsCard from "./NewsCard";

function NewsFeed() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      try {
        const token = import.meta.env.VITE_FINNHUB_KEY;
        const res = await fetch(
          `https://finnhub.io/api/v1/news?category=general&token=${token}`
        );
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        console.error("Error fetching news:", err);
      }
    }
    fetchNews();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {articles.map((article, idx) => (
        <NewsCard key={idx} article={article} />
      ))}
    </div>
  );
}

export default NewsFeed;
