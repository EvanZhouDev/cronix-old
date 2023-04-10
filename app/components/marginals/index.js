import styles from "./marginals.module.css"
export default ({ children }) => {
    return (
        <div className={styles.marginal}>
            {children}
        </div>
    )
}