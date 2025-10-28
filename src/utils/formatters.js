/*
Normalizes ticker symbols by removing suffixes.
e.g., "BTC/USD" -> "BTCUSD"
*/
export function normalizeTicker(ticker) {
  return ticker?.endsWith("/USD") ? ticker.replace("/USD", "USD") : ticker;
}

/*
Formats decimal point representation of dollar amount based on size of number
e.g., 1000.3123 -> 1000, 1.99202 -> 1.99, 0.32913129312321 -> 0.32913129
*/
export function formatDollar(amount) {
  const num = Number(amount);

  if (isNaN(num)) return amount;

  if (Math.abs(num) >= 1000) {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  if (Math.abs(num) >= 1) {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  });
}

/*
Returns dollar abbreviation string based on size of number input
e.g., 3,200,123,323 -> 3.20B, 11,2301 -> 11.23K
*/
export function formatDollarAbbrev(value) {
  if (value === null || value === undefined) return "-";

  const absValue = Math.abs(Number(value));

  if (absValue >= 1.0e12) {
    return (value / 1.0e12).toFixed(2) + "T";
  } else if (absValue >= 1.0e9) {
    return (value / 1.0e9).toFixed(2) + "B";
  } else if (absValue >= 1.0e6) {
    return (value / 1.0e6).toFixed(2) + "M";
  } else if (absValue >= 1.0e3) {
    return (value / 1.0e3).toFixed(2) + "K";
  } else {
    return value.toString();
  }
}

/*
De-pluralizes asset type
e.g., "STOCKS" -> "STOCK"
*/
export function formatAssetType(type) {
  return type[type.length - 1] === "s"
    ? type.slice(0, -1).toUpperCase()
    : type.toUpperCase();
}
