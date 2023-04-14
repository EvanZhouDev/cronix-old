'use client'
import { useState } from "react"
import styles from "./status.module.css"
import { FiTrash } from "react-icons/fi"
import applyPenalty from "@/app/src/applyPenalty"
export default function Status({ penalty: [selected, setSelected], handleDelete, timeListStatus: [timeList, setTimeList], session }) {
    let options = ["OK", "+2", "DNF"]
    let modTimeList = (x) => {
        setTimeList(prevTimeList => {
            let newTimeList = structuredClone(prevTimeList)
            newTimeList[session][newTimeList[session].length - 1].penalty = x;
            newTimeList[session][newTimeList[session].length - 1].formattedTime = applyPenalty(newTimeList[session][newTimeList[session].length - 1].time, x)
            let mathematicalTime = newTimeList[session][newTimeList[session].length - 1].time
            if (x === "DNF") mathematicalTime = -1;
            if (x === "+2") mathematicalTime = newTimeList[session][newTimeList[session].length - 1].time + 200
            newTimeList[session][newTimeList[session].length - 1].mathematicalTime = mathematicalTime
            return newTimeList;
        })
        setSelected(x)
    }
    return (
        <div className={styles.status}>
            {
                options.map(x =>
                    (<span key={x} onClick={() => { modTimeList(x) }} className={[styles.selection, x === selected ? styles.selected : ""].join(" ")}>{x}</span>)
                )
            }
            <span className={styles.delete} onClick={handleDelete}><FiTrash />Delete</span>
        </div>
    )
}