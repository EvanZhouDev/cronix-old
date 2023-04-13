'use client'
import styles from "./stats.module.css"
import useLocalStorage from "../components/src/useLocalStorage"
export default function Page() {
    let [timeList, setTimeList] = useLocalStorage("timeList", {
        "Session 1": []
    })
    return (<div className={styles.statsPage}>
        {JSON.stringify(timeList)}
    </div>)
}