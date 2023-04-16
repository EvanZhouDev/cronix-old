'use client'
import Option from "../option.js"
import { FiList } from "react-icons/fi";
import styles from "./titlebar.module.css"
import { useContext, useState } from "react"
import { SessionContext } from "@/app/sessionProvider"
import useLocalStorage from "@/app/src/useLocalStorage"
export default function SessionDropdown() {
  const [sessionCtx, setSession] = useContext(SessionContext);
  let session = sessionCtx.session

  let timeList = sessionCtx.data[session].timeList
  let setTimeList = (newTimeList) => {
    const updatedSessionCtx = structuredClone(sessionCtx);
    updatedSessionCtx.data[session].timeList = newTimeList;
    setSession(updatedSessionCtx);
  }

  let createSession = (sessionName) => {
    let updatedSessionCtx = structuredClone(sessionCtx)
    updatedSessionCtx.session = sessionName;
    if (!updatedSessionCtx.data[sessionName]) {
      updatedSessionCtx.data[sessionName] = {
        options: {
          event: "3x3",
          input: "Stackmat"
        },
        timeList: [],
        time: 0,
        scramble: "Trying to load scramble from cache...",
        status: "idle",
      }
    }
    setSession(updatedSessionCtx)
    console.log(session)
  }
  const [sessionName, setSessionName] = useState("");
  const handleSessionNameChange = (event) => {
    setSessionName(event.target.value);
  };
  return (
    <div className={styles.sessionWrapper}>
      <Option icon={<FiList size={20} />} name={session} href="/sessions" />
      <span className={styles.sessionDropdown}>
        <span onClick={() => { createSession(sessionName) }}>+</span>
        <input value={sessionName} onChange={handleSessionNameChange}></input>
        {
          Object.keys(sessionCtx.data).map(x => {
            return (<div className={styles.dropdownOptions} onClick={() => { createSession(x) }}>{x}</div>)
          })
        }
      </span>
    </div>
  )
}
