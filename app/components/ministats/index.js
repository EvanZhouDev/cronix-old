import { useState, useEffect } from "react";
import styles from "./ministats.module.css";
import formatTime from "../../src/formatTime.js";

export default function Ministats({ timeListStatus }) {
    const [timeList, setTimeList] = timeListStatus;

    const calcAvg = (list, type, amount) => {
        console.log(list);
        if (list.length < amount) return "...";
        // extract last `amount` amount from list
        let last = list.slice(-amount);
        for (let i = 0; i < last.length; i++) {
            last[i] = last[i].time;
        }

        if (type === "bo") {
            // best of avg
            return formatTime(Math.min(...last));
        }
        if (type === "mo") {
            // mean of avg
            return formatTime(
                Math.round(last.reduce((a, b) => a + b, 0) / last.length)
            );
        }
        if (type === "ao") {
            // average of avg, remove worst and best, then take mean
            let worst = Math.max(...last);
            let best = Math.min(...last);
            let rem = last.filter(item => item !== worst && item !== best);
            return formatTime(
                Math.round(rem.reduce((a, b) => a + b, 0) / rem.length)
            );
        }
    };

    const [avg, setAvg] = useState({
        mo3: "...",
        ao5: "...",
        ao12: "...",
    });

    useEffect(() => {
        setAvg(original => {
            let rem = { ...original };
            rem.mo3 = calcAvg(timeList["Session 1"], "mo", 3);
            rem.ao5 = calcAvg(timeList["Session 1"], "ao", 5);
            rem.ao12 = calcAvg(timeList["Session 1"], "ao", 12);
            return rem;
        });
    }, [timeList]);

    return (
        <div>
            {/* use styles.pb for PB colors! */}
            <span className={styles.stats}>mo3: {avg.mo3}</span>
            <span className={[styles.stats].join(" ")}>ao5: {avg.ao5}</span>
            <span className={styles.stats}>ao12: {avg.ao12}</span>
        </div>
    );
}