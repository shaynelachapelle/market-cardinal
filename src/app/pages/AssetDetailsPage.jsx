import AssetHeader from "../../features/asset-details/components/AssetHeader";
import AssetChartSection from "../../features/asset-details/components/AssetChartSection";
import AssetStats from "../../features/asset-details/components/AssetStats";
import AssetAbout from "../../features/asset-details/components/AssetAbout";

export default function AssetDetailsPage() {
  return (
    <div className="max-w-screen flex flex-col gap-4 my-4">
      <AssetHeader />
      <AssetChartSection />
      <AssetStats />
      <AssetAbout />
    </div>
  );
}
