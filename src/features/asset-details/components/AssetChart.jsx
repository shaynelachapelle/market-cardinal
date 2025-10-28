import { useEffect, useRef } from "react";
import { createChart, AreaSeries } from "lightweight-charts";
import { useTheme } from "../../../stores/ThemeContext";

/*
Currently using TradingView's Lightweight Charts library to provide
an out-of-the-box charting UI

Docs: https://tradingview.github.io/lightweight-charts/
*/

export default function AssetChart({ data, range }) {
  const chartContainerRef = useRef();
  const chartRef = useRef();
  const { theme } = useTheme();

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { color: theme === "dark" ? "#000000" : "#ffffff" },
        textColor: theme === "dark" ? "#f5f5f5" : "#333",
      },
      grid: {
        vertLines: { color: theme === "dark" ? "#2b2b2b" : "#eeeeee" },
        horzLines: { color: theme === "dark" ? "#2b2b2b" : "#eeeeee" },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    chartRef.current = chart;

    const areaSeries = chart.addSeries(AreaSeries, {
      lineColor: "#2962FF",
      topColor: "#2962FF",
      bottomColor: "rgba(41, 98, 255, 0.28)",
    });

    areaSeries.setData(data);

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };
    window.addEventListener("resize", handleResize);

    chart.timeScale().fitContent();

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data]);

  useEffect(() => {
    if (!chartRef.current) return;
    chartRef.current.applyOptions({
      layout: {
        background: { color: theme === "dark" ? "#000000" : "#ffffff" },
        textColor: theme === "dark" ? "#f5f5f5" : "#333",
      },
      grid: {
        vertLines: { color: theme === "dark" ? "#2b2b2b" : "#eeeeee" },
        horzLines: { color: theme === "dark" ? "#2b2b2b" : "#eeeeee" },
      },
    });
  }, [theme]);

  return (
    <div
      ref={chartContainerRef}
      className="w-full h-full border border-border-muted"
    />
  );
}
