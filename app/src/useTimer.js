import accurateInterval from "./accurateInterval";
import { useEffect, useContext } from "react"
import { randomScrambleForEvent } from "cubing/scramble";
import { setDebug } from "cubing/search";
import useLocalStorage from "./useLocalStorage";
import applyPenalty from "./applyPenalty"
import { v4 as uuidv4 } from 'uuid';
import { SessionContext } from "../sessionProvider.js"
// All the guts behind the timer!

export default function useTimer(type, setPenalty, timeList, setTimeList, penalty, session, sessionCtx, setSession) {
    // const [sessionCtx, setSession] = useContext(SessionContext);
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

    let time = sessionCtx.data[session].time;
    const setTime = (newTime) => {
        setSession(prevSession => {
            const updatedSessionCtx = structuredClone(prevSession);
            updatedSessionCtx.data[session].time = newTime;
            return updatedSessionCtx;
        });
    };

    let [timeStatus, setTimeStatus] = useLocalStorage("timeStatus", "idle")

    useEffect(() => {
        console.log(timeStatus)
    }, [timeStatus])

    let scrambleLoadMsg = "Getting scramble. For 3x3+, this may take some time."
    let [scramble, setScramble] = useLocalStorage("curScramble", scrambleLoadMsg, fetchScramble)

    // setTimeStatus("idle")
    async function fetchScramble(curType = (type ? type : "333")) {
        try {
            setScramble(scrambleLoadMsg);
            const scramble = await randomScrambleForEvent(curType);
            setScramble(scramble.toString());
        } catch (error) {
            console.log(error);
        }
    }

    const awaitTimerStartDown = (e) => {
        if (e.key === " " && !spaceHeldInterval) {
            spaceHeldInterval = setInterval(() => {
                spaceHeldTime += 100;
                if (spaceHeldTime >= startThreshold) {
                    console.log("AHHHH")
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
        console.log("ENDED")
        setSession((prevSession) => {
            let UUID = uuidv4();
            let parsedList = structuredClone(timeList);
            let mathematicalTime = prevSession.data[session].time
            if (penalty[0] === "DNF") mathematicalTime = -1;
            if (penalty[0] === "+2") mathematicalTime = prevTime + 2
            parsedList.push({
                time: prevSession.data[session].time,
                uuid: UUID,
                scramble: scramble === scrambleLoadMsg ? undefined : scramble,
                penalty: penalty[0],
                formattedTime: applyPenalty(prevSession.data[session].time, penalty[0]),
                mathematicalTime: mathematicalTime,
                date: new Date()
            });
            console.log(parsedList)
            let newSession = structuredClone(prevSession)
            newSession.data[session].timeList = parsedList
            console.log(newSession)
            return newSession;
        });
        if (timerInterval) timerInterval.cancel();
        timerInterval = undefined;
        spaceHeldTime = 0;
        fetchScramble()
        document.removeEventListener('keydown', awaitTimerEndDown);
        document.addEventListener('keydown', awaitTimerStartDown);
        document.addEventListener('keyup', awaitTimerStartUp);
        spaceHeldInterval = undefined;
        setTimeStatus("judging");
    }


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
                setSession(prevState => {
                    let newState = structuredClone(prevState)
                    newState.data[session].time = newState.data[session].time + 1
                    return newState
                })
            }, 10)
        }

        return () => {
            if (timerInterval) timerInterval.cancel();
        };
    }, [timeStatus]);

    useEffect(() => {
        refresh()
    }, [session])

    let refresh = (curEvent = type) => {
        console.log("REFRESH ALEERT")
        setTime(0);
        fetchScramble(curEvent);
        setPenalty("OK");
        setTimeStatus("idle");
    }

    return [timeStatus, time, scramble, refresh]
}