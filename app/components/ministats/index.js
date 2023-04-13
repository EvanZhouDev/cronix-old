import { useState, useEffect } from "react"
import styles from "./ministats.module.css"
import useLocalStorage from "../src/useLocalStorage"
import formatTime from "../src/formatTime.js"
export default function Ministats() {
    let [timeList, setTimeList] = useLocalStorage("timeList", {
        "Session 1": []
    }, {
        "Session 1": []
    })
    let [session, setSession] = useLocalStorage("session", "Session 1", "Session 1")

    let calcAvg = (list, type, amount) => {
        if (list.length < amount) return "..."
        // extract last `amount` amount from list
        let last = list.slice(-amount);
        for (let i = 0; i < last.length; i++) {
            last[i] = last[i].time
        }

        if (type === "bo") {
            // best of avg
            return formatTime(Math.min(...last))
        }
        if (type === "mo") {
            // mean of avg
            return formatTime(Math.round(last.reduce((a, b) => a + b, 0) / last.length))
        }
        if (type === "ao") {
            // average of avg, remove worst and best, then take mean
            let worst = Math.max(...last);
            let best = Math.min(...last);
            let rem = last.filter(item => item !== worst && item !== best);
            return formatTime(Math.round(rem.reduce((a, b) => a + b, 0) / rem.length))
        }
    }

    let [avg, setAvg] = useState({
        mo3: "...",
        ao5: "...",
        ao12: "...",
    })
    useEffect(() => {
        setAvg(original => {
            original.mo3 = calcAvg(timeList[session], "mo", 3)
            original.ao5 = calcAvg(timeList[session], "ao", 5)
            original.ao12 = calcAvg(timeList[session], "ao", 12)
            return original
        })
    }, [])

    return (
        <div>
            {/* use styles.pb for PB colors! */}
            <span className={styles.stats}>mo3: {avg.mo3}</span>
            <span className={[styles.stats].join(" ")}>ao5: {avg.ao5}</span>
            <span className={styles.stats}>ao12: {avg.ao12}</span>
        </div>
    )
}