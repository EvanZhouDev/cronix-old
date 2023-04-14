import styles from "./time.module.css"
import formatTime from "../../src/formatTime.js"
let applyPenalty = (time, penalty) => {
    if (penalty === "+2") return (formatTime(time + 200)) + "+"
    if (penalty === "DNF") return `DNF(${formatTime(time)})`
    return formatTime(time)
}
export default function Time({ time, status, penalty }) {
    return (
        <span className={[styles.time, styles[status]].join(" ")}>{(applyPenalty(time, penalty))}</span>
    )
}