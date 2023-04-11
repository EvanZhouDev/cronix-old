"use client"
// import useLocalStorage from "use-local-storage";

import React, { useEffect, useState } from "react";
import styles from "./bar.module.css"
import Selection from "./selection.js"
import Toggle from "./toggle.js"
import Divider from "./divider.js"
import { FiBox, FiWatch, FiMic, FiMoreVertical } from "react-icons/fi";

export default function Bar() {
    let settings = [{
        name: "event",
        types: [
            {
                name: "3x3",
                icon: <FiBox size={15} />
            },
            {
                name: "4x4",
                icon: <FiBox size={15} />
            },
            {
                name: "More",
                icon: <FiMoreVertical size={15} />
            },
        ]
    },
    {
        name: "input",
        types: [
            {
                name: "Timer",
                icon: <FiWatch size={15} />
            },
            {
                name: "Stackmat",
                icon: <FiMic size={15} />
            }
        ]
    }]

    // const [event, setEvent, removeEvent] = useLocalStorage('event', '3x3');
    // // let [event, setEvent] = useLocalStorage("event", "3x3")
    // console.log(event)
    // let [input, setInput] = useLocalStorage("input", "Timer")
    const [timerOptions, setTimerOptions] = useState(JSON.stringify(
        {
            event: null,
            input: null
        }
    ));

    useEffect(() => {
        if (window.localStorage.getItem("timerOptions") === undefined) {
            window.localStorage.setItem("timerOptions", JSON.stringify(
                {
                    event: null,
                    input: null
                }
            ));
        }
        setTimerOptions(JSON.parse(window.localStorage.getItem('timerOptions')));
    }, []);

    useEffect(() => {
        window.localStorage.setItem('timerOptions', JSON.stringify(timerOptions));
    }, [timerOptions]);

    let checkNew = (key, name) => {
        let cur = JSON.parse(timerOptions);
        cur[key] = name;
        setTimerOptions(JSON.stringify(cur))
    }

    return (
        <div className={styles.bar}>
            {

                settings.map(({ name, types }, i) => (
                    <React.Fragment key={i}>
                        <Selection>
                            {
                                types.map(toggle => {
                                    return (
                                        <Toggle selected={toggle.name === JSON.parse(timerOptions)[name]} key={toggle.name} name={toggle.name} icon={toggle.icon} onClick={() => checkNew(name, toggle.name)} />
                                    )
                                })
                            }
                        </Selection>
                        {i !== settings.length - 1 ? <Divider /> : null}
                    </React.Fragment>))
            }
        </div>
    )
}