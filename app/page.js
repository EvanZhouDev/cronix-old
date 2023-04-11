'use client'
import { useState, useEffect } from "react"
import styles from "./timer.module.css";
import Scrambo from "scrambo"
import Bar from "./components/bar"
import Status from "./components/status"
import Scramble from "./components/scramble"
import Ministats from "./components/ministats"
import Time from "./components/time"

import accurateInterval from "./components/scripts/accurateInterval";

// import { randomScrambleForEvent } from "cubing/scramble";

export default function Page() {
    var Scrambo = require('scrambo');

    var threebythree = new Scrambo(); // Defaults to 3x3

    // How long someone must hold spacebar to start timer
    let startThreshold = 400 // (CSTimer has 0.3s)
    let spaceHeldTime = 0 // How long space already held
    let spaceHeldInterval; // Interval for spaceHeldTime
    let timerInterval; // Interval to keep track of time

    let [timeStatus, setTimeStatus] = useState("idle");
    let [time, setTime] = useState(0)
    let [scramble, setScramble] = useState(threebythree.get(1)[0])

    const awaitTimerStartDown = (e) => {
        if (e.key === " " && !spaceHeldInterval) {
            spaceHeldInterval = setInterval(() => {
                spaceHeldTime += 100;
                if (spaceHeldTime >= startThreshold) {
                    setTime(0);
                    setTimeStatus("ready");
                }
                if (spaceHeldTime < startThreshold) setTimeStatus("unready");
            }, 100);
        }
    };

    const awaitTimerStartUp = (e) => {
        if (e.key === " ") {
            if (spaceHeldTime >= startThreshold) {
                setTimeStatus("timing");
                document.removeEventListener('keydown', awaitTimerStartDown);
                document.removeEventListener('keyup', awaitTimerStartUp);
            } else {
                setTimeStatus("idle");
            }
            clearInterval(spaceHeldInterval);
            spaceHeldTime = 0;
            spaceHeldInterval = undefined;
        }
    };

    const awaitTimerEndDown = (e) => {
        if (e.key === " ") {
            setTime((prevTime) => {
                console.log(prevTime);
                return prevTime;
            });
            setTimeStatus("idle");
            if (timerInterval) timerInterval.cancel();
            setScramble(threebythree.get(1)[0]);
            timerInterval = undefined;
            spaceHeldTime = 0;
            document.removeEventListener('keydown', awaitTimerEndDown);
            document.addEventListener('keydown', awaitTimerStartDown);
            document.addEventListener('keyup', awaitTimerStartUp);
            spaceHeldInterval = undefined;
        }
    };

    useEffect(() => {
        spaceHeldInterval = undefined;
        spaceHeldTime = 0

        document.addEventListener('keydown', awaitTimerStartDown);
        document.addEventListener('keyup', awaitTimerStartUp);

        return () => {
            document.removeEventListener('keydown', awaitTimerStartDown);
            document.removeEventListener('keyup', awaitTimerStartUp);
            clearInterval(spaceHeldInterval)
        }
    }, []);


    useEffect(() => {
        if (timeStatus === "timing") {
            document.addEventListener('keydown', awaitTimerEndDown);
            timerInterval = accurateInterval(() => {
                setTime(prevState => prevState + 1)
            }, 10)
        }

        return () => {
            if (timerInterval) timerInterval.cancel();
        };
    }, [timeStatus]);

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