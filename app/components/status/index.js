import styles from "./status.module.css"
export default () => {
    return (
        <div className={styles.status}>
            <span className={[styles.selection, styles.selected].join(" ")}>OK</span>
            <span className={styles.selection}>+2</span>
            <span className={styles.selection}>DNF</span>
            <span className={styles.selection}>Delete</span>
        </div>
    )
}