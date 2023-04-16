'use client'
import styles from "./stats.module.css"
import useLocalStorage from "../src/useLocalStorage"
import React, { useState, useEffect, useContext } from "react"
import LineChart from "./components/chart"
import Table from "./components/table"
import calcAvg from "../src/calculateAverage.js"
import StatModule from "./components/statModule"
import { SessionContext } from "../sessionProvider"
export default function Page() {
    // Use custom useLocalStorage hook to manage timeList state with default value
    const [sessionCtx, setSession] = useContext(SessionContext)
    let session = sessionCtx.session
    let timeList = sessionCtx.data[session].timeList
    console.log("STAT", sessionCtx)

    let setTimeList = (newTimeList) => {
        const updatedSessionCtx = structuredClone(sessionCtx);
        updatedSessionCtx.data[session].timeList = newTimeList;
        setSession(updatedSessionCtx);
    }

    // Use useState to manage data state with default value
    const [data, setData] = useState(timeList);

    useEffect(() => {
        timeList = sessionCtx.data[session].timeList

        setTimeList = (newTimeList) => {
            const updatedSessionCtx = structuredClone(sessionCtx);
            updatedSessionCtx.data[session].timeList = newTimeList;
            setSession(updatedSessionCtx);
        }

        let newList = structuredClone(timeList)
        for (let i = 1; i <= timeList.length; i++) {
            let curTimes = timeList.slice(0, i);
            newList[i - 1].ao5 = calcAvg(curTimes, "ao", 5);
            newList[i - 1].mo3 = calcAvg(curTimes, "mo", 3);
            newList[i - 1].ao12 = calcAvg(curTimes, "ao", 12);
        }
        setData(newList);

        // Call the updateData function whenever timeList changes
    }, [session, timeList]); // Pass timeList as a dependency to useEffect



    return (
        <div className={styles.statsPage}>
            {data.length === 0 ? <h3>Do solves to see your statistics.</h3> :
                <>
                    <div className={styles.vsection}>
                        <Table session={session} timeList={timeList} set={setTimeList} data={data} />
                        <LineChart rawData={data} />
                    </div>
                    <StatModule data={data} />
                </>
            }
        </div>
    );
};