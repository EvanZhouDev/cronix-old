import { useState, useEffect } from "react";
import styles from "./ministats.module.css";
import calcAvg from "@/app/src/calculateAverage";
export default function Ministats({ session, timeListStatus }) {
    const [timeList, _] = timeListStatus;

    const [avg, setAvg] = useState({
        mo3: "...",
        ao5: "...",
        ao12: "...",
    });

    useEffect(() => {
        setAvg(original => {
            let rem = structuredClone(original);
            rem.mo3 = calcAvg(timeList, "mo", 3);
            rem.ao5 = calcAvg(timeList, "ao", 5);
            rem.ao12 = calcAvg(timeList, "ao", 12);
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