import { useParams, useLocation } from "react-router-dom";
import { AssetContextProvider } from "./AssetContext";

/*
Separate symbol and location state from AssetContext component in order
to prevent unnecessary re-renders, enforces page re-renders only when symbol
or location is changed
*/
export function AssetContextWrapper({ children }) {
  const { symbol } = useParams();
  const location = useLocation();

  return (
    <AssetContextProvider symbol={symbol} location={location}>
      {children}
    </AssetContextProvider>
  );
}
