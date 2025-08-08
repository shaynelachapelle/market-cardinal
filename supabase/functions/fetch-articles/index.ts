import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { XMLParser } from "https://esm.sh/fast-xml-parser@4";
import * as cheerio from "https://esm.sh/cheerio@1";
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

const feeds = [
  { source: "CNBC", url: "https://www.cnbc.com/id/100003114/device/rss/rss.html" },
  { source: "MarketWatch", url: "https://feeds.content.dowjones.io/public/rss/mw_topstories" },
  { source: "The New York Times", url:"https://rss.nytimes.com/services/xml/rss/nyt/Economy.xml"},
  { source: "NASDAQ", url:"https://www.nasdaq.com/feed/rssoutbound?category=Markets"},
  { source: "NASDAQ", url: "https://www.nasdaq.com/feed/rssoutbound?category=Cryptocurrencies"},
  { source: "The Wall Street Journal", url: "https://feeds.content.dowjones.io/public/rss/RSSMarketsMain"}
];


Deno.serve(async () => {
  try {
    const parser = new XMLParser({ ignoreAttributes: false, processEntities: true });
    const limit = pLimit(2);
    const maxArticles = 2;

    const allItems: any[] = [];

    for (const feed of feeds) {
      try {
        const response = await fetch(feed.url);
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
                description: he.decode(i.description),
                image,
                source: feed.source,
                published_at: i.pubDate ? new Date(i.pubDate) : null
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
    const validItems = allItems.filter(item =>
      Object.values(item).every(
        val => val !== null && val !== ""
      )
    );

    if (validItems.length > 0) {
      const { error } = await supabase
        .from("articles")
        .upsert(validItems, { onConflict: "url" });

      if (error) {
        console.error("DB error:", error);
        return new Response(JSON.stringify({ success: false, error }), { status: 500 });
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
