import styles from "./stat.module.css"

export default function StatModule({ data }) {
  let bestAo5 = Infinity;
  let bestMo3 = Infinity;
  let bestAo12 = Infinity;
  let bestSingle = Infinity;

  for (let i = 0; i < data.length; i++) {
    bestAo5 = data[i].ao5 !== "..." ? Math.min(bestAo5, data[i].ao5) : bestAo5;
    bestMo3 = data[i].mo3 !== "..." ? Math.min(bestMo3, data[i].mo3) : bestMo3;
    bestAo12 = data[i].ao12 !== "..." ? Math.min(bestAo12, data[i].ao12) : bestAo12;
    bestSingle = data[i].mathematicalTime !== "..." ? Math.min(bestSingle, data[i].mathematicalTime) : bestSingle;
  }

  function calculateStandardDeviation(arr) {
    // Step 1: Calculate the mean of "mathematicalTime" entries
    const sum = arr.reduce((acc, obj) => acc + obj.mathematicalTime, 0);
    const mean = sum / arr.length;

    // Step 2: Calculate the squared differences from the mean
    const squaredDifferences = arr.map(obj => (obj.mathematicalTime - mean) ** 2);

    // Step 3: Calculate the mean of squared differences
    const squaredDifferencesSum = squaredDifferences.reduce((acc, val) => acc + val, 0);
    const meanOfSquaredDifferences = squaredDifferencesSum / arr.length;

    // Step 4: Calculate the square root of the mean of squared differences
    const standardDeviation = Math.sqrt(meanOfSquaredDifferences);

    return standardDeviation;
  }

  return (
    <div className={styles.stat}>
      <div>
        Single: {data[data.length - 1].mathematicalTime / 100}
        <br />
        Best single: {bestSingle === Infinity ? "..." : bestSingle / 100}
      </div>
      <div>
        ao5: {data[data.length - 1].ao5}
        <br />
        Best ao5: {bestAo5 === Infinity ? "..." : bestAo5}
      </div>
      <div>
        mo3: {data[data.length - 1].mo3}
        <br />
        Best mo3: {bestMo3 === Infinity ? "..." : bestMo3}
      </div>
      <div>
        ao12: {data[data.length - 1].ao12}
        <br />
        Best ao12: {bestAo12 === Infinity ? "..." : bestAo12}
      </div>
      <div>
        Standard Deviation:
        <br />
        {Math.round(calculateStandardDeviation(data)) / 100} seconds
      </div>
    </div>

  );
}
