import { useTheme } from "../stores/ThemeContext";

const normalizeTicker = (ticker) =>
  ticker?.endsWith("/USD") ? ticker.replace("/USD", "USD") : ticker;

export default function findLogo(asset) {
  const { theme } = useTheme();

  return asset?.asset_type === "stocks" || asset?.asset_type === "ETFs"
    ? `https://img.logo.dev/ticker/${asset?.symbol}?token=${
        import.meta.env.VITE_LOGODEV_KEY
      }&size=128&retina=true&format=png&theme=${
        theme === "dark" ? "dark" : "light"
      }`
    : asset?.asset_type === "crypto"
    ? `https://img.logo.dev/crypto/${normalizeTicker(asset?.symbol)}?token=${
        import.meta.env.VITE_LOGODEV_KEY
      }&size=128&retina=true&format=png&theme=${
        theme === "dark" ? "dark" : "light"
      }`
    : null;
}
