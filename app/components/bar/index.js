"use client"
// import useLocalStorage from "use-local-storage";

import React, { useEffect, useState } from "react";
import styles from "./bar.module.css"
import Selection from "./selection.js"
import Toggle from "./toggle.js"
import Divider from "./divider.js"
import { FiBox, FiWatch, FiMic, FiMoreVertical } from "react-icons/fi";
import useLocalStorage from "../src/useLocalStorage.js";
import Dropdown from "./dropdown.js"

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
                icon: <FiMoreVertical size={15} />,
                submenu: [
                    {
                        name: "2x2",
                        icon: <FiBox size={15} />
                    },
                    {
                        name: "3x3",
                        icon: <FiBox size={15} />
                    },
                    {
                        name: "4x4",
                        icon: <FiBox size={15} />
                    },
                    {
                        name: "5x5",
                        icon: <FiBox size={15} />
                    },
                    {
                        name: "6x6",
                        icon: <FiBox size={15} />
                    },
                    {
                        name: "7x7",
                        icon: <FiBox size={15} />
                    },
                ]
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
    // const [timerOptions, setTimerOptions] = useState(JSON.stringify(
    //     {
    //         event: null,
    //         input: null
    //     }
    // ));

    // useEffect(() => {
    //     if (window.localStorage.getItem("timerOptions") === undefined) {
    //         window.localStorage.setItem("timerOptions", JSON.stringify(
    //             {
    //                 event: "3x3",
    //                 input: "Timer"
    //             }
    //         ));
    //     }
    //     setTimerOptions(JSON.parse(window.localStorage.getItem('timerOptions')));
    // }, []);

    // useEffect(() => {
    //     window.localStorage.setItem('timerOptions', JSON.stringify(timerOptions));
    // }, [timerOptions]);
    const [timerOptions, setTimerOptions] = useLocalStorage(
        'timerOptions',
        JSON.stringify({
            event: "3x3",
            input: "Timer"
        })
    );

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
                                        !toggle.submenu ?
                                            <Toggle selected={toggle.name === JSON.parse(timerOptions)[name]} key={toggle.name} name={toggle.name} icon={toggle.icon} onClick={() => checkNew(name, toggle.name)} /> : <Dropdown selected={JSON.parse(timerOptions)[name]} name={toggle.name} data={toggle.submenu} icon={toggle.icon} dictkey={name} fn={checkNew} />
                                    )
                                })
                            }
                        </Selection>
                        {i !== settings.length - 1 ? <Divider /> : null}
                    </React.Fragment>))
            }
            {/* <Selection>
                <Dropdown icon={<FiBox />} name="test" data={settings[0].types[2].submenu} />
            </Selection> */}
        </div>
    )
}