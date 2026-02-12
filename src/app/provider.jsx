import { ThemeProvider } from "../stores/ThemeContext";
import { UserProvider } from "../stores/UserContext";
import { WatchlistProvider } from "../features/watchlist/stores/WatchlistContext";
import { NewsCategoryProvider } from "../features/news-feed/stores/NewsCategoryContext";
import { AssetCategoryProvider } from "../features/price-feed/stores/AssetCategoryContext";
import { PriceFeedProvider } from "../features/price-feed/stores/PriceFeedContext";
import { NewsFeedProvider } from "../features/news-feed/stores/NewsFeedContext";
import { MarketStatusProvider } from "../stores/MarketStatusContext";
import { AssetContextProvider } from "../features/asset-details/stores/AssetContext";
import { TickerBarProvider } from "../features/tickerbar/stores/TickerBarContext";
import { ScrollHideProvider } from "../stores/ScrollHideContext";

export function Provider({ children }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <ScrollHideProvider>
          <MarketStatusProvider>
            <TickerBarProvider>
              <WatchlistProvider>
                <NewsCategoryProvider>
                  <AssetCategoryProvider>
                    <PriceFeedProvider>
                      <NewsFeedProvider>
                        <AssetContextProvider>{children}</AssetContextProvider>
                      </NewsFeedProvider>
                    </PriceFeedProvider>
                  </AssetCategoryProvider>
                </NewsCategoryProvider>
              </WatchlistProvider>
            </TickerBarProvider>
          </MarketStatusProvider>
        </ScrollHideProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
