import { Chart as _ } from 'chart.js/auto'
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react"
import styles from "./chart.module.css"
export default function LineChart({ rawData }) {
    console.log(rawData)
    const [chartData, setChartData] = useState([]); // Initialize chartData state with empty object

    // Update chartData state with new rawData whenever it changes
    useEffect(() => {
        console.log(rawData)
        setChartData(rawData);
    }, [rawData]); // Update chartData state whenever rawData changes

    let lineChart = chartData[0] ? (<Line data={
        {
            labels: Array(rawData.length).fill(0).map((_, i) => i + 1),
            datasets: [
                {
                    label: "Single",
                    backgroundColor: "#E2B712",
                    borderColor: "#E2B712",
                    data: rawData.map(x => x.mathematicalTime === -1 ? undefined : x.mathematicalTime / 100),
                },
                {
                    label: "ao5",
                    backgroundColor: "#CA4754",
                    borderColor: "#CA4754",
                    data: rawData.map(x => x.mathematicalTime === -1 ? undefined : parseFloat(x.ao5)),
                },
                {
                    label: "mo3",
                    backgroundColor: "#61C9A8",
                    borderColor: "#61C9A8",
                    data: rawData.map(x => x.mathematicalTime === -1 ? undefined : parseFloat(x.mo3)),
                },
                {
                    label: "ao12",
                    backgroundColor: "#89D2DC",
                    borderColor: "#89D2DC",
                    data: rawData.map(x => x.mathematicalTime === -1 ? undefined : parseFloat(x.ao12)),
                },
            ],
        }
    } options={{
        animation: {
            duration: 0,
        },
        maintainAspectRatio: false
    }} width={"50%"} />) : null
    return (
        <div className={styles.chart}>
            {/* Render the chart component with updated chartData */}
            {lineChart}
        </div>
    );
}