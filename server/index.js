import WebSocket from "ws";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { DateTime } from "luxon";

dotenv.config();

const URL = process.env.SUPABASE_URL;
const API_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(URL, API_KEY);

let symbols; //TODO: implement realtime to handle active symbols
let prevClose;
const updateBuffer = new Map();

async function loadActiveSymbols() {
  const { data, error } = await supabase
    .from("prices")
    .select("symbol, status, asset_type")
    .eq("status", true)
    .or("asset_type.eq.stocks, asset_type.eq.ETFs");

  if (error) {
    console.log("Error fetching active symbols:", error);
  } else {
    symbols = data.map((item) => item.symbol);
    console.log("Fetched symbols:", symbols);
  }
}

async function loadPreviousClose() {
  //TODO: refresh after market close
  const { data, error } = await supabase
    .from("prices")
    .select("symbol, previous_close")
    .in("symbol", symbols);

  if (error) {
    console.error("Error fetching previous_close values:", error);
  } else {
    prevClose = Object.fromEntries(
      data.map(({ symbol, previous_close }) => [symbol, previous_close])
    );
  }
}

function schedulePrevCloseRefresh() {
  async function scheduleNextRun() {
    const now = DateTime.now().setZone("America/New_York");
    let nextRun = now.set({ hour: 9, minute: 29, second: 30, millisecond: 0 });

    if (now.weekday <= 5) {
      // Only schedule on weekdays
      if (now > nextRun) nextRun = nextRun.plus({ days: 1 });
    } else {
      // Skip weekends – next Monday
      const daysUntilMonday = 8 - now.weekday;
      nextRun = nextRun.plus({ days: daysUntilMonday });
    }

    const delay = nextRun.diff(now).as("milliseconds");
    console.log(`Next previous_close refresh scheduled for ${nextRun.toISO()}`);

    setTimeout(async () => {
      console.log("Refreshing previous_close values...");
      await loadPreviousClose();
      scheduleNextRun();
    }, delay);
  }

  scheduleNextRun();
}

function bufferUpdate(symbol, price, updatedAt) {
  const previous = prevClose[symbol];
  const change = price - previous;
  const percentChange = previous ? (change / previous) * 100 : 0;

  updateBuffer.set(symbol, {
    symbol,
    price: price.toFixed(2),
    change: change.toFixed(2),
    percent_change: percentChange.toFixed(2),
    updated_at: updatedAt,
  });
}

async function flushBatch() {
  if (updateBuffer.size === 0) return;

  const batch = Array.from(updateBuffer.values());
  updateBuffer.clear();

  try {
    const { error } = await supabase.from("prices").upsert(batch, {
      onConflict: "symbol",
    });

    if (error) throw error;
    console.log(`Batch upserted ${batch.length} symbols`);
  } catch (err) {
    console.error("Batch upsert failed:", err.message);
  }
}

/*
async function updatePrice(symbol, price, updatedAt) {
  const previous = prevClose[symbol];
  const change = price - previous;
  const percentChange = previous ? (change / previous) * 100 : 0;

  const { error } = await supabase
    .from("prices")
    .update({
      price: price.toFixed(2),
      change: change.toFixed(2),
      percent_change: percentChange.toFixed(2),
      updated_at: updatedAt,
    })
    .eq("symbol", symbol);

  if (error) {
    console.error(`Failed to update ${symbol}:`, error.message);
  } else {
    console.log(`Updated ${symbol} → $${price.toFixed(2)}`);
  }
}
*/

//TODO: fix volume calculation
async function updateVolume(symbol, price, volume, updatedAt) {
  const vol = price * volume;

  const { error } = await supabase
    .from("prices")
    .update({
      volume: vol.toFixed(2),
      updated_at: updatedAt,
    })
    .eq("symbol", symbol);

  if (error) {
    console.error(`Failed to update ${symbol} volume:`, error.message);
  } else {
    console.log(`Updated ${symbol} Volume → $${vol.toFixed(2)}`);
  }
}

async function startWebSocket() {
  await loadActiveSymbols();

  await loadPreviousClose();

  schedulePrevCloseRefresh();

  const socket = new WebSocket("wss://stream.data.alpaca.markets/v2/iex");

  socket.on("open", () => {
    console.log("Connected to Alpaca websocket");
    socket.send(
      JSON.stringify({
        action: "auth",
        key: process.env.ALPACA_KEY,
        secret: process.env.ALPACA_SECRET,
      })
    );
  });

  socket.on("message", async (raw) => {
    const messages = JSON.parse(raw.toString());

    for (const msg of messages) {
      if (msg.T === "success" && msg.msg === "authenticated") {
        console.log("Authenticated. Subscribing to bars...");
        socket.send(
          JSON.stringify({
            action: "subscribe",
            dailyBars: symbols,
            trades: symbols,
          })
        );
      }

      /*
      Calculate volume based on daily bars
      */
      if (msg.T === "d") {
        const { S: symbol, v: volume, vw: price, t: time } = msg;
        await updateVolume(symbol, price, volume, time);
      }

      /*
      Collect price updates on every trade, update every second to avoid excessive database calls
      */
      if (msg.T === "t") {
        const { S: symbol, p: price, t: time } = msg;
        bufferUpdate(symbol, price, time);
      }

      if (msg.T === "error") console.error("WebSocket error:", msg);
    }
  });

  socket.on("close", () => {
    console.log("WebSocket closed. Reconnecting in 5s...");
    setTimeout(startWebSocket, 5000);
  });

  socket.on("error", (err) => console.error("WebSocket error:", err));
}

setInterval(flushBatch, 1000);

startWebSocket();
