'use client'
import styles from "./timer.module.css";
import Bar from "./components/bar"
import Status from "./components/status"
import Scramble from "./components/scramble"
import Ministats from "./components/ministats"
import Time from "./components/time"
import { useState } from "react"
import handleTimer from "./components/src/handleTimer.js";
import { FiBox, FiWatch, FiMic, FiMoreVertical } from "react-icons/fi";
import useLocalStorage from "./components/src/useLocalStorage.js";
export default function Page() {
    let [settings, setSettings] = useState([{
        name: "event",
        types: [
            {
                name: "3x3",
                icon: <FiBox size={15} />
            },
            {
                name: "4x4",
                icon: <FiBox size={15} />
            },
            {
                name: "More",
                icon: <FiMoreVertical size={15} />,
                submenu: [
                    {
                        name: "2x2",
                        icon: <FiBox size={15} />
                    },
                    {
                        name: "3x3",
                        icon: <FiBox size={15} />
                    },
                    {
                        name: "4x4",
                        icon: <FiBox size={15} />
                    },
                    {
                        name: "5x5",
                        icon: <FiBox size={15} />
                    },
                    {
                        name: "6x6",
                        icon: <FiBox size={15} />
                    },
                    {
                        name: "7x7",
                        icon: <FiBox size={15} />
                    },
                ]
            },
        ]
    },
    {
        name: "input",
        types: [
            {
                name: "Timer",
                icon: <FiWatch size={15} />
            },
            {
                name: "Stackmat",
                icon: <FiMic size={15} />
            }
        ]
    }])

    const [timerOptions, setTimerOptions] = useLocalStorage(
        'timerOptions',
        JSON.stringify({
            event: "3x3",
            input: "Timer"
        })
    );
    let [timeStatus, time, scramble] = handleTimer();

    return (
        <div className={styles.timerPage}>
            <div className={styles.vsection}>
                {timeStatus !== "timing" ? <Bar settings={[settings, setSettings]} timerOptions={[timerOptions, setTimerOptions]} /> : null}
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