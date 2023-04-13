import styles from "./bar.module.css"

export default function selection ({ children }) {
    return (
        <div className={styles.selection}>
            {children}
        </div>
    )
}