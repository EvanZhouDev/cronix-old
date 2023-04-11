'use client'
import { useState } from "react"
import styles from "./status.module.css"
import { FiTrash } from "react-icons/fi"
export default function Status() {
    let options = ["OK", "+2", "DNF"]
    let [selected, setSelected] = useState(options[0])
    return (
        <div className={styles.status}>
            {
                options.map(x =>
                    (<span key={x} onClick={() => { setSelected(x) }} className={[styles.selection, x === selected ? styles.selected : ""].join(" ")}>{x}</span>)
                )
            }
            <span className={styles.delete}><FiTrash />Delete</span>
        </div>
    )
}