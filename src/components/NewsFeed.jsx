import React from "react";
import { useState, useEffect } from "react";
import NewsCard from "./NewsCard";

function NewsFeed() {
  const [articles, setArticles] = useState([]);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const formatted = yesterday.toISOString().split("T")[0];

  useEffect(() => {
    async function fetchNews() {
      try {
        const token = import.meta.env.VITE_MARKETAUX_KEY;
        const res = await fetch(
          `https://api.marketaux.com/v1/news/all?countries=ca,us&must_have_entities=true&published_on=${formatted}&filter_entities=true&api_token=${token}&language=en`
        );
        const data = await res.json();
        setArticles(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        console.error("Error fetching news:", err);
        setArticles([]); // ensure articles is always an array
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
