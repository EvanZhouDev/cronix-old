import styles from "./bar.module.css"

export default function Toggle({ name, selected, icon, onClick }) {
    return (
        <span className={selected ? [styles.toggle, styles.selected].join(" ") : styles.toggle} onClick={onClick}>
            {icon}
            <span className={styles.name}>{name}</span>
        </span>
    )
}