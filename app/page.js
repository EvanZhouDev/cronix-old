import styles from "./timer.module.css";

import Bar from "./components/bar"
import Status from "./components/status"
import Scramble from "./components/scramble"
import Ministats from "./components/ministats"
export default () => {
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