import formatTime from "./formatTime"
export default function calcAvg(list, type, amount) {
    if (list.length < amount) return "...";
    // extract last `amount` amount from list
    let last = list.slice(-amount);
    for (let i = 0; i < last.length; i++) {
        last[i] = last[i].time;
    }

    if (type === "bo") {
        // best of avg
        return formatTime(Math.min(...last));
    }
    if (type === "mo") {
        // mean of avg
        return formatTime(
            Math.round(last.reduce((a, b) => a + b, 0) / last.length)
        );
    }
    if (type === "ao") {
        // average of avg, remove worst and best, then take mean
        let worst = Math.max(...last);
        let best = Math.min(...last);
        let rem = last.filter(item => item !== worst && item !== best);
        return formatTime(
            Math.round(rem.reduce((a, b) => a + b, 0) / rem.length)
        );
    }
};