import styles from "./time.module.css"
function formatTime(input) {
    let milliseconds = input * 10
    const seconds = Math.floor(milliseconds / 1000);
    let rem = milliseconds % 1000;
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const remainingSeconds = seconds % 60;
    const remainingMilliseconds = milliseconds % 1000;

    const formattedSeconds = String(remainingSeconds);
    const formattedMilliseconds = String(remainingMilliseconds / 10).padStart(2, "0");

    if (hours > 0) {
        return `${hours}:${minutes}:${formattedSeconds}.${formattedMilliseconds}`;
    } else if (minutes > 0) {
        return `${minutes}:${formattedSeconds}.${formattedMilliseconds}`;
    } else {
        return `${formattedSeconds}.${formattedMilliseconds}`;
    }
}
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