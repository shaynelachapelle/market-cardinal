import { createContext, useContext, useState } from "react";

const AssetCategoryContext = createContext();

export function AssetCategoryProvider({ children }) {
  const [assetCategory, setAssetCategory] = useState("Stocks");

  return (
    <AssetCategoryContext.Provider value={{ assetCategory, setAssetCategory }}>
      {children}
    </AssetCategoryContext.Provider>
  );
}

export function useAssetCategory() {
  return useContext(AssetCategoryContext);
}
