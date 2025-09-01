import react from "react";
import Content from "../../components/Content.jsx";
import { NewsCategoryProvider } from "../../components/NewsCategoryContext.jsx";
import { AssetCategoryProvider } from "../../components/AssetCategoryContext.jsx";

export default function Overview() {
  return (
    <NewsCategoryProvider>
      <AssetCategoryProvider>
        <Content />
      </AssetCategoryProvider>
    </NewsCategoryProvider>
  );
}
