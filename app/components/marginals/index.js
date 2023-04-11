import styles from "./marginals.module.css"
export default function Marginals({ children }) {
    return (
        <div className={styles.marginal}>
            {children}
        </div>
    )
}