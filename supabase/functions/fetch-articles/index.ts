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

async function getOGImage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);
    return $('meta[property="og:image"]').attr("content") || null;
  } catch (err) {
    console.error(`Failed to fetch OG image for ${url}:`, err);
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
    source: "Federal Reserve Board",
    url: "https://www.federalreserve.gov/feeds/press_all.xml",
    category: "general",
  },
  {
    source: "The New York Times",
    url: "https://rss.nytimes.com/services/xml/rss/nyt/Economy.xml",
    category: "general",
  },
  {
    source: "The Motley Fool",
    url: "https://www.fool.ca/feed/",
    category: "general",
  },
  {
    source: "TMX Montreal",
    url: "https://feeds.feedburner.com/MxCirculars",
    category: "general",
  },
  {
    source: "Yahoo Finance",
    url: "https://rss.app/rss-feed?keyword=yahoo%20financ&region=US&lang=en",
    category: "general",
  },
  {
    source: "The Economist",
    url: "https://rss.app/feeds/7OsomLor3921CNtX.xml",
    category: "general",
  },
  {
    source: "The Wall Street Journal",
    url: "https://feeds.content.dowjones.io/public/rss/RSSMarketsMain",
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

        const itemsToProcess = parsed.rss.channel.item.slice(0, maxArticles);

        const feedItems = await Promise.all(
          itemsToProcess.map((i: any) =>
            limit(async () => {
              let image =
                i["media:content"]?.["@_url"] ||
                i["media:thumbnail"]?.["@_url"] ||
                i.enclosure?.["@_url"] ||
                null;

              if (!image) {
                console.log(`No RSS image for ${i.link}, fetching OG image...`);
                image = await getOGImage(i.link);
              }

              return {
                title: he.decode(i.title),
                url: i.link,
                description: cleanDescription(i.description),
                image,
                source: feed.source,
                published_at: i.pubDate ? new Date(i.pubDate) : null,
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

    if (validItems.length > 0) {
      const { error } = await supabase
        .from("articles")
        .upsert(validItems, { onConflict: "url" });

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
