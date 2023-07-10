import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface IChartProps {
  isDark: boolean;
}

export const Chart = ({ isDark }: IChartProps) => {
  const { coinId } = useOutletContext<IChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => Number(price.close))!,
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 300,
              width: 500,
              background: "transparent",
              toolbar: {
                show: false,
              },
            },
            grid: {
              show: false,
            },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              labels: {
                show: false,
              },
              type: "datetime",
              categories: data?.map((price) => price.time_close * 1000),
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#0be881"],
                stops: [0, 100],
              },
            },
            colors: ["#0fbcf9"],
            tooltip: {
              y: {
                formatter: (value) => `${value.toFixed(2)}`,
              },
            },
          }}
        ></ApexChart>
      )}
    </div>
  );
};
