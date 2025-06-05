import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
    time_open: number;
    time_close: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

interface ChartProps {
    coinId: string;
}

function formatUnixToDate(unixTimestamp: number) {
    const date = new Date(unixTimestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

function Chart( { coinId }: ChartProps ) {
    const {isLoading, data} = useQuery<IHistorical[]>({
        queryKey: ["ohlcv", coinId],
        queryFn: () => fetchCoinHistory(coinId),
        refetchInterval: 10000,
    });
    return (
        <div>
            {isLoading ? "Loading chart..." : <ApexChart type="line" series={[
                {
                    name: "Chart",
                    data: data?.map(price => price.close) ?? []
                }
            ]} options={{
                theme: {
                    mode: "dark",
                }, 
                chart: {
                    height: 300,
                    width: 500,
                    toolbar: {
                        show: false,
                    },
                },
                grid: {
                    show: false,
                },
                stroke: {
                    curve: "smooth",
                    width: 3,
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
                    categories: data?.map(price => formatUnixToDate(price.time_close))
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        gradientToColors: ["#0fbcf9"],
                        stops: [0, 100],
                    },
                },
                colors: ["#0be881"],
                tooltip: {
                    y: {
                        formatter: (value) => `$ ${value.toFixed(2)}`
                    },
                },
            }} />}
        </div>
    );
}

export default Chart;