import { useEffect, useState, useMemo } from "react";
import AssetChart from "./AssetChart";
import { MinusIcon, XCircleIcon } from "@heroicons/react/16/solid";
import Spinner from "../../../components/Spinner";
import { useAssetContext } from "../stores/AssetContext";

export default function AssetChartSection() {
  const [data, setData] = useState([]);
  const [range, setRange] = useState("5 years");
  const [loading, setLoading] = useState(true);
  const { symbol } = useAssetContext();

  useEffect(() => {
    setData([]);
    setLoading(true);

    async function fetchChartData() {
      try {
        const response = await fetch(
          `https://financialmodelingprep.com/stable/historical-price-eod/light?symbol=${symbol}&apikey=${
            import.meta.env.VITE_FMP_KEY
          }`
        );
        const json = await response.json();

        if (Array.isArray(json)) {
          const formatted = json.map((item) => ({
            time: item.date,
            value: item.price,
          }));

          formatted.sort((a, b) => new Date(a.time) - new Date(b.time));

          setData(formatted);
        }
      } catch (err) {
        console.error("Chart fetch failed", err);
      } finally {
        setLoading(false);
      }
    }

    if (symbol) {
      fetchChartData();
    }
  }, [symbol]);

  const ranges = [
    //"1 day",
    //"5 days",
    "1 month",
    "6 months",
    "Year to date",
    "1 year",
    "5 years",
    //"All time",
  ];

  const filterByRange = (allData, range) => {
    if (!allData.length) return [];

    const now = new Date();
    const startDate = new Date(allData[0].time);
    let cutoff;

    switch (range) {
      case "1 day":
        cutoff = new Date(now);
        cutoff.setDate(now.getDate() - 1);
        break;
      case "5 days":
        cutoff = new Date(now);
        cutoff.setDate(now.getDate() - 5);
        break;
      case "1 month":
        cutoff = new Date(now);
        cutoff.setMonth(now.getMonth() - 1);
        break;
      case "6 months":
        cutoff = new Date(now);
        cutoff.setMonth(now.getMonth() - 6);
        break;
      case "Year to date":
        cutoff = new Date(now.getFullYear(), 0, 1);
        break;
      case "1 year":
        cutoff = new Date(now);
        cutoff.setFullYear(now.getFullYear() - 1);
        break;
      case "5 years":
        cutoff = new Date(now);
        cutoff.setFullYear(now.getFullYear() - 5);
        break;
      case "All time":
        cutoff = startDate;
        break;
      default:
        cutoff = startDate;
    }

    return allData.filter((d) => new Date(d.time) >= cutoff);
  };

  const filteredData = filterByRange(data, range);

  const { high, low, changePercent } = useMemo(() => {
    if (!filteredData.length)
      return { high: null, low: null, changePercent: null };

    const values = filteredData.map((d) => d.value);
    const high = Math.max(...values).toFixed(2);
    const low = Math.min(...values).toFixed(2);

    const first = filteredData[0].value;
    const last = filteredData[filteredData.length - 1].value;
    const changePercent = (((last - first) / first) * 100).toFixed(2);

    return { high, low, changePercent };
  }, [filteredData]);

  return (
    <div className="flex flex-col gap-2 bg-bg px-8 py-4 mx-4 border border-border rounded-lg">
      <h3 className="text-text mb-2 font-semibold text-xl">Chart</h3>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row bg-bg-light gap-2 w-fit border border-border-muted rounded-lg flex-wrap">
            {ranges.map((label) => (
              <button
                key={label}
                className={`p-1 px-2 hover:bg-bg rounded-lg hover:text-primary duration-200 cursor-pointer ${
                  label === range
                    ? "text-primary bg-bg"
                    : "text-text bg-bg-light"
                }`}
                onClick={() => setRange(label)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex flex-row justify-between min-w-md border border-border-muted rounded-lg flex-wrap gap-8 text-text p-1 px-3 bg-bg-light cursor-default">
            <p className="flex flex-row items-center gap-2">
              <span>High: </span>
              {high ? (
                <span className="font-semibold font-mono text-lg">{high}</span>
              ) : (
                <MinusIcon className="size-4" />
              )}
            </p>
            <p className="flex flex-row items-center gap-2">
              <span>Low: </span>
              {low ? (
                <span className="font-semibold font-mono text-lg">{low}</span>
              ) : (
                <MinusIcon className="size-4" />
              )}
            </p>
            <p className="flex flex-row items-center gap-2">
              <span className="">Change: </span>
              {changePercent ? (
                <span
                  className={`font-mono font-semibold text-lg
                  ${changePercent > 0 ? `text-green-500` : `text-red-500`}
                `}
                >
                  {changePercent > 0 && "+"}
                  {changePercent}%
                </span>
              ) : (
                <MinusIcon className="size-4" />
              )}
            </p>
          </div>
        </div>
        <div className="relative">
          <AssetChart data={filteredData} range={range} />

          <div
            className={`absolute size-10 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10 transition-opacity duration-400 ${
              loading ? "opacity-100" : "opacity-0"
            }`}
          >
            <Spinner />
          </div>
          {!loading && filteredData.length === 0 && (
            <p className="absolute flex flex-row items-center gap-2 opacity-60 text-text-muted top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10">
              <XCircleIcon className="size-4" />{" "}
              <span>
                {symbol} chart data is not currently available. Stay tuned for
                new data.
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
