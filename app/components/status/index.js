'use client'
import { useState } from "react"
import styles from "./status.module.css"
import { FiTrash } from "react-icons/fi"
export default function Status({ penalty: [selected, setSelected], handleDelete }) {
    let options = ["OK", "+2", "DNF"]
    return (
        <div className={styles.status}>
            {
                options.map(x =>
                    (<span key={x} onClick={() => { setSelected(x) }} className={[styles.selection, x === selected ? styles.selected : ""].join(" ")}>{x}</span>)
                )
            }
            <span className={styles.delete} onClick={handleDelete}><FiTrash />Delete</span>
        </div>
    )
}