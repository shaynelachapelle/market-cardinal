import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { XMLParser } from "https://esm.sh/fast-xml-parser@4";
import * as cheerio from "https://esm.sh/cheerio@1";
import { load as cheerioLoad } from "https://esm.sh/cheerio@1";
import pLimit from "https://esm.sh/p-limit@3";
import he from "https://esm.sh/he@1.2.0";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

async function getOGImage(url: string) {
  try {
    const res = await fetch(url, { redirect: "follow" });
    const html = await res.text();
    const $ = cheerio.load(html);
    return $('meta[property="og:image"]').attr("content") || null;
  } catch (err) {
    console.error(`Failed to fetch OG image for ${url}:`, err.message);
    return null;
  }
}

function cleanDescription(rawDescription) {
  if (!rawDescription) return null;
  const $ = cheerioLoad(rawDescription);
  const text = $.text();
  return he.decode(text.trim());
}

const feeds = [
  {
    source: "CNBC",
    url: "https://www.cnbc.com/id/100003114/device/rss/rss.html",
    category: "general",
  },
  {
    source: "CNBC",
    url: "https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=10000664",
    category: "general",
  },
  {
    source: "CNBC",
    url: "https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=100003114",
    category: "general",
  },
  {
    source: "CNBC",
    url: "https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=20910258",
    category: "general",
  },
  {
    source: "Los Angeles Times",
    url: "https://www.latimes.com/business/technology/rss2.0.xml",
    category: "general",
  },
  {
    source: "The New York Times",
    url: "https://rss.nytimes.com/services/xml/rss/nyt/Economy.xml",
    category: "general",
  },
  {
    source: "The New York Times",
    url: "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml",
    category: "general",
  },
  {
    source: "The Wall Street Journal",
    url: "https://feeds.content.dowjones.io/public/rss/RSSMarketsMain",
    category: "general",
  },
  {
    source: "The Wall Street Journal",
    url: "https://feeds.content.dowjones.io/public/rss/socialeconomyfeed",
    category: "general",
  },
  {
    source: "The Wall Street Journal",
    url: "https://feeds.content.dowjones.io/public/rss/RSSWSJD",
    category: "general",
  },
  {
    source: "The Washington Post",
    url: "https://feeds.washingtonpost.com/rss/business",
    category: "general",
  },
  {
    source: "AlphaStreet",
    url: "https://news.alphastreet.com/feed/",
    category: "general",
  },
  {
    source: "Toronto Star",
    url: "https://www.thestar.com/search/?f=rss&t=article&c=business*&l=50&s=start_time&sd=desc",
    category: "general",
  },
  {
    source: "CBC",
    url: "https://www.cbc.ca/webfeed/rss/rss-business",
    category: "general",
  },
  {
    source: "Cointelegraph",
    url: "https://cointelegraph.com/rss",
    category: "crypto",
  },
  {
    source: "CoinDesk",
    url: "https://www.coindesk.com/arc/outboundfeeds/rss",
    category: "crypto",
  },
  {
    source: "Blockchain.News",
    url: "https://blockchain.news/RSS/",
    category: "crypto",
  },
  {
    source: "CryptoPotato",
    url: "https://cryptopotato.com/feed/",
    category: "crypto",
  }
];

Deno.serve(async () => {
  try {
    const parser = new XMLParser({
      ignoreAttributes: false,
      processEntities: true,
    });
    const limit = pLimit(2);
    const maxArticles = 2;

    const allItems: any[] = [];

    for (const feed of feeds) {
      try {
        const response = await fetch(feed.url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36",
            Accept: "application/xml, text/xml, */*; q=0.01",
          },
        });
        const xml = await response.text();
        const parsed = parser.parse(xml);

        // Normalize items: RSS vs Atom
        let items = parsed?.rss?.channel?.item || parsed?.feed?.entry;
        if (!items) {
          console.error(`No items found for ${feed.source}`, parsed);
          continue;
        }
        if (!Array.isArray(items)) items = [items];

        const itemsToProcess = items.slice(0, maxArticles);

        const feedItems = await Promise.all(
          itemsToProcess.map((i: any) =>
            limit(async () => {

              let url = i.link;
              if (typeof url === "object") {
                url = url["@_href"] || url["#text"] || null;
              }

              let image =
                i["media:content"]?.["@_url"] ||
                i["media:thumbnail"]?.["@_url"] ||
                i.enclosure?.["@_url"] ||
                null;

              if (!image && url) {
                console.log(`No RSS image for ${url}, fetching OG image...`);
                image = await getOGImage(url);
              }

              return {
                title: he.decode(i.title?.["@_text"] || i.title || ""),
                url,
                description: cleanDescription(i.summary || i.description || null),
                image,
                source: feed.source,
                published_at: i.pubDate
                  ? new Date(i.pubDate)
                  : i.updated
                  ? new Date(i.updated)
                  : null,
                category: feed.category,
              };
            })
          )
        );

        allItems.push(...feedItems);
      } catch (err) {
        console.error(`Error processing ${feed.source}:`, err);
      }
    }

    // Remove rows with any null/empty string fields
    const validItems = allItems.filter((item) =>
      Object.values(item).every((val) => val !== null && val !== "")
    );
    
    // Deduplicate by URL before insert
    const dedupedItems = Array.from(
      new Map(validItems.map((item) => [item.url, item])).values()
    );

    if (dedupedItems.length > 0) {
      const { error } = await supabase
        .from("articles")
        .upsert(dedupedItems, { onConflict: "url" });

      if (error) {
        console.error("DB error:", error);
        return new Response(JSON.stringify({ success: false, error }), {
          status: 500,
        });
      }
    }

    return new Response(
      JSON.stringify({ success: true, count: validItems.length }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Fetch/parse error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 }
    );
  }
});
