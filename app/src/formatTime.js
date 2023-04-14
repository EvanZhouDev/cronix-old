export default function formatTime(input) {
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