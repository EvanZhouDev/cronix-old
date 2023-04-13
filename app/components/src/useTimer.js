import accurateInterval from "./accurateInterval";
import { useState, useEffect } from "react"
import { randomScrambleForEvent } from "cubing/scramble";
import { setDebug } from "cubing/search";
import useLocalStorage from "./useLocalStorage";
import { v4 as uuidv4 } from 'uuid';
// All the guts behind the timer!

export default function useTimer(type, setPenalty) {
    // You can specify any subset of debug options.
    setDebug({
        logPerf: false, // Disable console info like scramble generation durations.
        scramblePrefetchLevel: "none", // Never prefetch scrambles.
        forceStringWorker: true, // Workaround for bundlers that mangle worker instantiation.
    });

    // How long someone must hold spacebar to start timer
    let startThreshold = 400 // (CSTimer has 0.3s)
    let spaceHeldTime = 0 // How long space already held
    let spaceHeldInterval; // Interval for spaceHeldTime
    let timerInterval; // Interval to keep track of time

    let [timeStatus, setTimeStatus] = useState("idle")
    let [time, setTime] = useState(0)
    let [scramble, setScramble] = useState("Getting scramble. For 3x3+, this may take some time.")
    let [session, setSession] = useLocalStorage("session", "Session 1")
    let [timeList, setTimeList] = useLocalStorage("timeList", {
        "Session 1": []
    })

    const awaitTimerStartDown = (e) => {
        if (e.key === " " && !spaceHeldInterval) {
            spaceHeldInterval = setInterval(() => {
                spaceHeldTime += 100;
                if (spaceHeldTime >= startThreshold) {
                    setTime(0);
                    setTimeStatus("ready");
                    setPenalty("OK")
                }
                if (spaceHeldTime < startThreshold) {
                    setTimeStatus("unready")
                };
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
                if (timeStatus === "unready" || timeStatus === "judging" || timeStatus === "timing") {
                    setTimeStatus("judging");
                } else {
                    setTimeStatus("idle");
                }
            }
            clearInterval(spaceHeldInterval);
            spaceHeldTime = 0;
            spaceHeldInterval = undefined;
        }
    };

    const awaitTimerEndDown = (e) => {
        let UUID = uuidv4();
        setTime((prevTime) => {
            setTimeList(prevList => {
                let parsedList = prevList
                if (!parsedList[session].length || UUID !== parsedList[session][parsedList[session].length - 1].uuid) {
                    parsedList[session].push({
                        time: prevTime,
                        uuid: UUID
                    });
                }
                return parsedList;
            })
            return prevTime;
        });
        if (timerInterval) timerInterval.cancel();
        timerInterval = undefined;
        spaceHeldTime = 0;
        fetchScramble()
        setTimeStatus("judging");
        document.removeEventListener('keydown', awaitTimerEndDown);
        document.addEventListener('keydown', awaitTimerStartDown);
        document.addEventListener('keyup', awaitTimerStartUp);
        spaceHeldInterval = undefined;
    }

    async function fetchScramble(dry = false) {
        if (dry) {
            await randomScrambleForEvent("444");
        } else {
            try {
                setScramble("Getting scramble. For 3x3+, this may take some time.");
                const scramble = await randomScrambleForEvent(type);
                setScramble(scramble.toString());
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        // fetchScramble(true);
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
            document.addEventListener('keydown', awaitTimerEndDown, { once: true });
            timerInterval = accurateInterval(() => {
                setTime(prevState => prevState + 1)
            }, 10)
        }

        return () => {
            if (timerInterval) timerInterval.cancel();
        };
    }, [timeStatus]);

    useEffect(() => {
        fetchScramble()
    }, [type])

    return [timeStatus, time, scramble]
}