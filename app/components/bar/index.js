"use client"

import React from "react";
import styles from "./bar.module.css"
import Selection from "./selection.js"
import Toggle from "./toggle.js"
import Divider from "./divider.js"
import Dropdown from "./dropdown.js"
export default function Bar({ settings: [settings, setSettings], timerOptions: [timerOptions, setTimerOptions] }) {
    let modify = (key, name) => {
        setSettings(oldSettings => {
            let cur = JSON.parse(JSON.stringify(timerOptions));
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