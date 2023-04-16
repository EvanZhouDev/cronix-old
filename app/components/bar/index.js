"use client"

import React from "react";
import styles from "./bar.module.css"
import Selection from "./selection.js"
import Toggle from "./toggle.js"
import Divider from "./divider.js"
import Dropdown from "./dropdown.js"
export default function Bar({ settings: [settings, setSettings], timerOptions: [timerOptions, setTimerOptions], refresh }) {
    let eventMap = {
        "2x2": "222",
        "3x3": "333",
        "4x4": "444",
        "5x5": "555",
        "6x6": "666",
        "7x7": "777",
        "3x3 Blind": "333bf",
        "3x3 FMC": "333fm",
        "3x3 One-Handed": "333oh",
        "Square-1": "sq1",
        "Megaminx": "minx",
        "Clock": "clock",
        "Pyraminx": "pyram",
        "Skewb": "skewb",
        "4x4 Blind": "444bf",
        "5x5 Blind": "555bf",
    }

    let modify = (key, name) => {
        setSettings(oldSettings => {
            let cur = JSON.parse(JSON.stringify(timerOptions));
            if (key === "event" && cur[key] !== name) refresh(eventMap[name]);
            cur[key] = name;
            setTimerOptions(cur)
            if (cur.event !== "3x3" && cur.event !== oldSettings[0].types[1]) {
                oldSettings[0].types[1] = oldSettings[0].types[2].submenu.find(item => item.name === cur.event);
            }
            return oldSettings;
        })
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
                                            <Toggle selected={toggle.name === timerOptions[name]} key={toggle.name} name={toggle.name} icon={toggle.icon} onClick={() => modify(name, toggle.name)} /> : <Dropdown key={toggle.name} selected={timerOptions[name]} name={toggle.name} data={toggle.submenu} icon={toggle.icon} dictkey={name} fn={modify} />
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