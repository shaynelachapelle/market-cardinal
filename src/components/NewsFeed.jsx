import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../supabase-client.js";
import NewsCard from "./NewsCard";
import NewsCardSkeleton from "./NewsCardSkeleton.jsx";
import { useNewsCategory } from "./NewsCategoryContext.jsx";

function NewsFeed() {
  const { newsCategory, setNewsCategory } = useNewsCategory();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const formatted = yesterday.toISOString().split("T")[0];

  useEffect(() => {
    async function fetchArticles() {
      //setLoading(true);
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("published_at", { ascending: false })
        .eq("category", newsCategory.toLowerCase())
        .limit(10);

      if (error) {
        console.error("Error fetching articles: ", error);
      } else {
        setArticles(data);
      }
      setLoading(false);
    }
    fetchArticles();
  }, [newsCategory]);

  if (loading)
    return (
      <div className="flex flex-col gap-4">
        <NewsCardSkeleton />
        <NewsCardSkeleton />
        <NewsCardSkeleton />
        <NewsCardSkeleton />
        <NewsCardSkeleton />
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      {articles.map((article, idx) => (
        <NewsCard key={idx} article={article} />
      ))}
    </div>
  );
}

export default NewsFeed;
