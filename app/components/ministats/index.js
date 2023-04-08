import styles from "./ministats.module.css"
export default () => {
    return (
        <div>
            <span className={styles.stats}>mo3: 10.23</span>
            <span className={[styles.stats, styles.pb].join(" ")}>PB ao5: 11.34</span>
            <span className={styles.stats}>ao12: 13.45</span>
        </div>
    )
}