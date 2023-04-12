'use client'
import styles from "./timer.module.css";
import Bar from "./components/bar"
import Status from "./components/status"
import Scramble from "./components/scramble"
import Ministats from "./components/ministats"
import Time from "./components/time"

import handleTimer from "./components/src/handleTimer.js";

export default function Page() {
    let [timeStatus, time, scramble] = handleTimer();

    return (
        <div className={styles.timerPage}>
            <div className={styles.vsection}>
                {timeStatus !== "timing" ? <Bar /> : null}
            </div>
            <div className={styles.vsection}>
                {timeStatus !== "timing" ? <Scramble scramble={scramble} /> : null}
                <Time time={time} status={timeStatus} />
                {timeStatus !== "timing" ? <Status /> : null}
            </div>
            <div className={styles.vsection}>
                {timeStatus !== "timing" ? <Ministats /> : null}
            </div>
        </div>
    )
}