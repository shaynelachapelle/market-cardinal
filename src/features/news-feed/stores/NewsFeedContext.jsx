import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../../app/supabase-client.js";

const NewsFeedContext = createContext();

export function NewsFeedProvider({ children }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const MAX_PER_CATEGORY = 10;

  /*
  Function to maintain ordering of articles based on publishing date,
  ensures ordering is maintained after every new article is inserted through realtime
  */
  function normalizeArticles(list) {
    const sorted = [...list].sort(
      (a, b) => new Date(b.published_at) - new Date(a.published_at)
    );

    const trimmedByCategory = {};
    for (const article of sorted) {
      const cat = article.category;
      if (!trimmedByCategory[cat]) trimmedByCategory[cat] = [];
      if (trimmedByCategory[cat].length < MAX_PER_CATEGORY) {
        trimmedByCategory[cat].push(article);
      }
    }

    return Object.values(trimmedByCategory).flat();
  }

  /*
  Initially fetch 100 most recent articles regardless of category in order
  to avoid additional db calls and loading times on change of news category
  */
  useEffect(() => {
    if (articles.length > 0) return;

    async function fetchArticles() {
      setLoading(true);
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("published_at", { ascending: false })
        .limit(100);

      if (!error && data) {
        setArticles(normalizeArticles(data));
      }
      setLoading(false);
    }

    fetchArticles();

    /*
    Supabase realtime subscription to keep articles state updated on insert of new 
    articles in db
    */
    const channel = supabase
      .channel("articles-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "articles" },
        (payload) => {
          setArticles((prev) => normalizeArticles([payload.new, ...prev]));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <NewsFeedContext.Provider value={{ articles, loading }}>
      {children}
    </NewsFeedContext.Provider>
  );
}

export function useNewsFeed() {
  return useContext(NewsFeedContext);
}
