'use client'
import styles from "./stats.module.css"
import useLocalStorage from "../src/useLocalStorage"
import React, { useState, useEffect } from "react"
import LineChart from "./components/chart"
import Table from "./components/table"
import calcAvg from "../src/calculateAverage.js"
export default function Page() {
    // Use custom useLocalStorage hook to manage timeList state with default value
    const [timeList, setTimeList] = useLocalStorage("timeList", {
        "Session 1": []
    });

    // Use useState to manage data state with default value
    const [data, setData] = useState(timeList["Session 1"]);

    useEffect(() => {
        // Define a function to calculate ao5, mo3, ao12 for each item in timeList
        const updateData = () => {
            let newList = structuredClone(timeList)["Session 1"];
            for (let i = 1; i <= newList.length; i++) {
                let curTimes = newList.slice(0, i);
                newList[i-1].ao5 = calcAvg(curTimes, "ao", 5);
                newList[i-1].mo3 = calcAvg(curTimes, "mo", 3);
                newList[i-1].ao12 = calcAvg(curTimes, "ao", 12);
            }
            setData(newList);
        };

        // Call the updateData function whenever timeList changes
        updateData();
    }, [timeList]); // Pass timeList as a dependency to useEffect


    return (
        <div className={styles.statsPage}>
            {data.length === 0 ? <h3>Do solves to see your statistics.</h3> :
                <>
                    <Table data={data} />
                    <LineChart rawData={data} />
                </>
            }
            {/* Render Table component and LineChart component with updated data */}
        </div>
    );
};