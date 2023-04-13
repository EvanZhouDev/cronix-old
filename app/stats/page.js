'use client'
import styles from "./stats.module.css"
import useLocalStorage from "../components/src/useLocalStorage"
export default function Page() {
    let [timeList, setTimeList] = useLocalStorage("timeList", JSON.stringify([]))
    return (<div className={styles.statsPage}>
        {JSON.parse(timeList).join(", ")}
    </div>)
}