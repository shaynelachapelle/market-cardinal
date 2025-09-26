import { ThemeProvider } from "../stores/ThemeContext";
import { UserProvider } from "../stores/UserContext";
import { WatchlistProvider } from "../features/watchlist/stores/WatchlistContext";
import { NewsCategoryProvider } from "../features/news-feed/stores/NewsCategoryContext";
import { AssetCategoryProvider } from "../features/price-feed/stores/AssetCategoryContext";
import { PriceFeedProvider } from "../features/price-feed/stores/PriceFeedContext";
import { NewsFeedProvider } from "../features/news-feed/stores/NewsFeedContext";

export function Provider({ children }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <WatchlistProvider>
          <NewsCategoryProvider>
            <AssetCategoryProvider>
              <PriceFeedProvider>
                <NewsFeedProvider>{children}</NewsFeedProvider>
              </PriceFeedProvider>
            </AssetCategoryProvider>
          </NewsCategoryProvider>
        </WatchlistProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
