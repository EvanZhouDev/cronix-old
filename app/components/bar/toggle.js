import styles from "./bar.module.css"

export default ({ name, icon, selected }) => {
    return (
        <span className={[styles.toggle, selected ? styles.selected : ""].join(" ")}>
            {icon}
            <span className={styles.name}>{name}</span>
        </span>
    )
}