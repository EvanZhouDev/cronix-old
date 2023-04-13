import accurateInterval from "./accurateInterval";
import { useState, useEffect } from "react"
import { randomScrambleForEvent } from "cubing/scramble";
import { setDebug } from "cubing/search";

// All the guts behind the timer!

export default function handleTimer(type, timeStatusState, timeState, scrambleState) {
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

    let [timeStatus, setTimeStatus] = timeStatusState
    let [time, setTime] = timeState
    let [scramble, setScramble] = scrambleState

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
        // if (e.key === " ") {
        setTime((prevTime) => {
            console.log(prevTime);
            return prevTime;
        });
        setTimeStatus("idle");
        if (timerInterval) timerInterval.cancel();
        setScramble(scrambler.get(1)[0]);
        timerInterval = undefined;
        spaceHeldTime = 0;
        document.removeEventListener('keydown', awaitTimerEndDown);
        document.addEventListener('keydown', awaitTimerStartDown);
        document.addEventListener('keyup', awaitTimerStartUp);
        spaceHeldInterval = undefined;
        // }
    };

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
            document.addEventListener('keydown', awaitTimerEndDown);
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