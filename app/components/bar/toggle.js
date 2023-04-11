import styles from "./bar.module.css"

export default function Toggle({ name, selected, icon, onClick }) {
    // console.log(cur, name, cur === name, cur === name ? [styles.toggle, styles.selected].join(" ") : "")
    return (
        <span className={selected ? [styles.toggle, styles.selected].join(" ") : styles.toggle} onClick={onClick}>
            {icon}
            <span className={styles.name}>{name}</span>
        </span>
    )
}