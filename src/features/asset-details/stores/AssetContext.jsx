import { createContext, useContext } from "react";

export const AssetContext = createContext(null);

export function useAssetContext() {
  return useContext(AssetContext);
}
