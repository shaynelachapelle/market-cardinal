import NewsCard from "../components/NewsCard.jsx";
import NewsCardSkeleton from "../../news-feed/components/NewsCardSkeleton.jsx";
import { useNewsCategory } from "../stores/NewsCategoryContext.jsx";
import { useNewsFeed } from "../stores/NewsFeedContext.jsx";

export default function NewsFeed() {
  const { newsCategory } = useNewsCategory();
  const { articles, loading } = useNewsFeed();

  const filtered = articles.filter(
    (a) => a.category === newsCategory.toLowerCase()
  );

  return (
    <div className="flex flex-col gap-4">
      {loading
        ? Array.from({ length: 5 }).map((_, i) => <NewsCardSkeleton key={i} />)
        : filtered.map((article, idx) => (
            <NewsCard key={idx} article={article} />
          ))}
    </div>
  );
}
