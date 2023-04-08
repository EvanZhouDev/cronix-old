import styles from "./bar.module.css"

export default ({ children }) => {
    return (
        <div className={styles.selection}>
            {children}
        </div>
    )
}