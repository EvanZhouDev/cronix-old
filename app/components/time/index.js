import styles from "./time.module.css"
import applyPenalty from "../../src/applyPenalty"

export default function Time({ time, status, penalty }) {
    console.log(time, status, penalty)
    return (
        <span className={[styles.time, styles[status]].join(" ")}>{(applyPenalty(time, penalty))}</span>
    )
}