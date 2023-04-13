"use client"
import classNames from "classnames"
import styles from "./bar.module.css"

export default function Toggle({ name, selected, icon, onClick }) {
    return (
        <span className={classNames(styles.toggle, { [styles.selected]: selected })} onClick={onClick} >
            {icon}
            <span className={styles.name} > {name}</span>
        </span>
    )
}