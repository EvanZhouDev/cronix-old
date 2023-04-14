import formatTime from "./formatTime.js"
export default function applyPenalty(time, penalty) {
    if (penalty === "+2") return (formatTime(time + 200)) + "+"
    if (penalty === "DNF") return `DNF(${formatTime(time)})`
    return formatTime(time)
}