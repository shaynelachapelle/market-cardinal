import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const FMP_KEY = Deno.env.get("FMP_KEY")!;

Deno.serve(async () => {
  async function fetchStocks() {
    try {
      const { data, error } = await supabase
        .from("prices")
        .select("symbol, name")
        .eq("asset_type", "stock");

      if (error) {
        console.error("Error fetching stock data from database: ", error);
        return [];
      }
      const symbols = data.map((row) => row.symbol);

      const symbolNameMap = new Map<string, string | null>();
      data.forEach(({ symbol, name }) => {
        symbolNameMap.set(symbol, name); 
      });

      const res = await fetch(
        `https://data.alpaca.markets/v2/stocks/snapshots?symbols=${symbols.join(",")}`,
        {
          headers: {
            "APCA-API-KEY-ID": Deno.env.get("ALPACA_KEY")!,
            "APCA-API-SECRET-KEY": Deno.env.get("ALPACA_SECRET")!,
          },
        }
      );

      const json = await res.json();

      async function fetchName(symbol: string): Promise<string | null> {
        try {
          const res = await fetch(
            `https://financialmodelingprep.com/stable/search-symbol?query=${symbol}&apikey=${FMP_KEY}`
          );

          if (!res.ok) {
            console.error(`Failed FMP fetch for ${symbol}. Status: ${res.status}`);
            return null;
          }

          const json = await res.json();
          return json[0]?.name || null;

        } catch (err) {
          console.error(`Error fetching name for symbol ${symbol}:`, err);
          return null;
        }
      }

      const processedData = (
        await Promise.all(
          symbols.map(async (symbol) => {
            const s = json[symbol];
            if (!s?.latestTrade || !s?.prevDailyBar) return null;

            const price = s.latestTrade.p;
            const prevClose = s.prevDailyBar.c;
            const change = price - prevClose;
            const percentChange = ((change / prevClose) * 100).toFixed(2);

            const existingName = symbolNameMap.get(symbol);
            const companyName = existingName || await fetchName(symbol);

            return {
              symbol,
              name: companyName,
              price,
              change: change.toFixed(2),
              percent_change: percentChange,
              volume: s.dailyBar?.v || 0,
              asset_type: "stock",
              updated_at: new Date().toISOString(),
            };
          })
        )
      ).filter(Boolean);

      const { data: upsertData, error: upsertError } = await supabase
        .from("prices")
        .upsert(processedData, { onConflict: ["symbol"] });

      if (upsertError) {
        console.error("Error upserting stock data, ", upsertError);
        return new Response(
          JSON.stringify({ success: false, error: upsertError.message }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );

      } else {
        console.log("Stock data upserted successfully.");
        return new Response(
          JSON.stringify({ success: true }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );

      }
    } catch (err) {
      console.error("Error fetching stocks:", err);
      return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 }
      );
      
    }
  }

  return await fetchStocks();
});
