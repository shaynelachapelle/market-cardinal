import { useParams, useLocation } from "react-router-dom";
import { AssetContextProvider } from "./AssetContext";

export function AssetContextWrapper({ children }) {
  const { symbol } = useParams();
  const location = useLocation();

  return (
    <AssetContextProvider symbol={symbol} location={location}>
      {children}
    </AssetContextProvider>
  );
}
