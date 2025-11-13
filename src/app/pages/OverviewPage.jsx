import { useRef, useEffect, useState } from "react";
import NewsFeed from "../../features/news-feed/components/NewsFeed";
import PriceFeed from "../../features/price-feed/components/PriceFeed";
import Dropdown from "../../components/Dropdown";
import { useNewsCategory } from "../../features/news-feed/stores/NewsCategoryContext";
import { useAssetCategory } from "../../features/price-feed/stores/AssetCategoryContext";
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/16/solid";

export default function OverviewPage() {
  const { newsCategory, setNewsCategory } = useNewsCategory();
  const { assetCategory, setAssetCategory } = useAssetCategory();
  const newsRef = useRef(null);
  const assetsRef = useRef(null);
  const [isBottomVisible, setIsBottomVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBottomVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (assetsRef.current) observer.observe(assetsRef.current);
    return () => observer.disconnect();
  }, []);

  function handleJump() {
    const target = isBottomVisible ? newsRef.current : assetsRef.current;

    const headerOffset = 80 + 16; //header height + margin
    const elementPosition = target.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-4 px-2 lg:px-4 min-h-screen">
      <div
        ref={newsRef}
        className="col-span-2 shadow-md bg-bg border border-border rounded-lg py-3 px-2 md:p-4"
      >
        <div className="flex flex-row justify-between items-center mb-3 lg:mb-4">
          <h2 className="w-full text-text font-semibold pl-1 md:pl-0">News</h2>
          <Dropdown
            options={["General", "Crypto"]}
            selected={newsCategory}
            onSelect={(value) => setNewsCategory(value)}
          />
        </div>
        <NewsFeed />
      </div>

      <div
        ref={assetsRef}
        className="col-span-2 lg:col-span-1 bg-bg shadow-md border border-border rounded-lg py-3 px-2 md:p-4"
      >
        <div className="flex flex-row justify-between items-center mb-3 md:mb-4">
          <h2 className="w-full text-text font-semibold pl-1 mb-2 md:pl-0">
            Top Stocks
          </h2>
          {/*<Dropdown
            options={["Stocks", "Crypto"]}
            selected={assetCategory}
            onSelect={(value) => setAssetCategory(value)}
          />*/}
        </div>
        <PriceFeed />
      </div>

      <button
        className="fixed flex flex-row lg:hidden gap-2 items-center bottom-4 right-3 shadow text-text w-fit font-semibold bg-bg-light border border-primary/80 rounded py-1 px-2 z-10"
        onClick={handleJump}
      >
        <span className="relative top-[-2px]">
          {isBottomVisible ? "News" : "Stocks"}
        </span>
        {isBottomVisible ? (
          <ArrowUpCircleIcon className="size-4" />
        ) : (
          <ArrowDownCircleIcon className="size-4" />
        )}{" "}
      </button>
    </div>
  );
}
