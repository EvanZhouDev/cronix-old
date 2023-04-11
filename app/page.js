'use client'
import { useEffect } from "react"
import styles from "./timer.module.css";

import Bar from "./components/bar"
import Status from "./components/status"
import Scramble from "./components/scramble"
import Ministats from "./components/ministats"



export default function Page() {
  useEffect(() => {
    let downTimer
    function handleKeyDown(e) {
      console.log(e)
      if (e.key === " ") {
        downTimer = setInterval(function () {
          console.log("AHHH")
        }, 1);
      }
    }
    function handleKeyUp(e) {
      if (e.key === " ") {
        clearInterval(downTimer)
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    // Don't forget to clean up
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(downTimer)
    }
  }, []);

  return (
    <div className={styles.timerPage}>
      <div className={styles.vsection}>
        <Bar />
      </div>
      <div className={styles.vsection}>
        <Scramble />
        <span className={styles.time}>0.00</span>
        <Status />
      </div>
      <div className={styles.vsection}>
        <Ministats />
      </div>
    </div>
  )
}