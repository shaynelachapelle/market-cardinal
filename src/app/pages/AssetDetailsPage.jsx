import { useParams } from "react-router-dom";

export default function AssetDetailsPage() {
  const params = useParams();
  return (
    <div className="p-4">
      <h1 className="text-text text-xl font-bold">Asset Details</h1>
      <p className="text-text-muted">
        {`This is where the asset details for ${params.symbol} would be.`}
      </p>
    </div>
  );
}
