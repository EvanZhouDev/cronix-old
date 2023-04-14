'use client'
import styles from "./timer.module.css";
import Bar from "./components/bar"
import Status from "./components/status"
import Scramble from "./components/scramble"
import Ministats from "./components/ministats"
import Time from "./components/time"
import { useState, useEffect } from "react"
import useTimer from "./src/useTimer.js";
import { FiBox, FiWatch, FiMic, FiMoreVertical, FiEyeOff, FiPenTool, FiClock, FiStar } from "react-icons/fi";
import useLocalStorage from "./src/useLocalStorage.js";
export default function Page() {
    const [timerOptions, setTimerOptions] = useLocalStorage(
        'timerOptions',
        {
            event: "3x3",
            input: "Timer"
        },
        {
            event: null,
            input: null
        }
    );

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
                    {
                        name: "3x3 Blind",
                        icon: <FiEyeOff size={15} />
                    },
                    {
                        name: "3x3 One-Handed",
                        icon: <FiBox size={15} /> // add more relevant symbol
                    },
                    {
                        name: "3x3 Multi-Blind",
                        icon: <FiEyeOff size={15} />
                    },
                    {
                        name: "3x3 FMC",
                        icon: <FiPenTool size={15} />
                    },
                    {
                        name: "Square-1",
                        icon: <FiStar size={15} />
                    },
                    {
                        name: "Megaminx",
                        icon: <FiStar size={15} />
                    },
                    {
                        name: "Clock",
                        icon: <FiClock size={15} />
                    },
                    {
                        name: "Pyraminx",
                        icon: <FiStar size={15} />
                    },
                    {
                        name: "Skewb",
                        icon: <FiStar size={15} />
                    },
                    {
                        name: "4x4 Blind",
                        icon: <FiEyeOff size={15} />
                    },
                    {
                        name: "5x5 Blind",
                        icon: <FiEyeOff size={15} />
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

    useEffect(() => {
        setSettings(oldSettings => {
            let cur = timerOptions;
            let updatedSettings = [...oldSettings]; // Create a copy of the settings array
            if (cur.event !== "3x3" && cur.event !== oldSettings[0].types[1].name) {
                updatedSettings[0].types[1] = oldSettings[0].types[2].submenu.find(item => item.name === cur.event);
            }
            return updatedSettings;
        })
    }, [timerOptions])

    let eventMap = {
        "2x2": "222",
        "3x3": "333",
        "4x4": "444",
        "5x5": "555",
        "6x6": "666",
        "7x7": "777",
        "3x3 Blind": "333bf",
        "3x3 FMC": "333fm",
        "3x3 One-Handed": "333oh",
        "Square-1": "sq1",
        "Megaminx": "minx",
        "Clock": "clock",
        "Pyraminx": "pyram",
        "Skewb": "skewb",
        "4x4 Blind": "444bf",
        "5x5 Blind": "555bf",
    }

    let [timeList, setTimeList] = useLocalStorage("timeList", {
        "Session 1": []
    })
    let [session, setSession] = useLocalStorage("session", "Session 1", "Session 1")

    let penalty = useLocalStorage("penalty","OK")
    let [timeStatus, time, scramble, refresh] = useTimer(eventMap[timerOptions.event], penalty[1], timeList, setTimeList, penalty, session, setSession);

    let handleDelete = () => {
        setTimeList(oldList => {
            let newList = structuredClone(oldList);
            newList[session].pop();
            refresh()
            return newList
        })
    }

    return (
        <div className={styles.timerPage}>
            <div className={styles.vsection}>
                {timeStatus !== "timing" ? <Bar settings={[settings, setSettings]} timerOptions={[timerOptions, setTimerOptions]} /> : null}
            </div>
            <div className={styles.vsection}>
                {timeStatus !== "timing" ? <Scramble scramble={scramble} /> : null}
                <Time time={time} penalty={penalty[0]} status={timeStatus} />
                {timeStatus === "judging" ? <Status timeListStatus={[timeList, setTimeList]} handleDelete={handleDelete} penalty={penalty} session={session} /> : null}
            </div>
            <div className={styles.vsection}>
                {timeStatus !== "timing" ? <Ministats timeListStatus={[timeList, setTimeList]} /> : null}
            </div>
        </div>
    )
}