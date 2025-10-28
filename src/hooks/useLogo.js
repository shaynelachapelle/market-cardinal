import { useTheme } from "../stores/ThemeContext";
import { normalizeTicker } from "../utils/formatters";

/*
Fetch asset logo based on ticker and current theme, taking into account asset type
to hit correct API endpoint

Docs: https://docs.logo.dev/logo-images/introduction
*/

export default function useLogo(asset) {
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
