import styles from "./bar.module.css";
import Toggle from "./toggle.js"
export default function Dropdown({ selected, icon, name, data, fn, dictkey }) {
    return (
        <div className={styles.dropdownParent}>
            <Toggle icon={icon} name={name} />
            <span className={styles.dropdown}>
                {
                    data.map(x => {
                        return <Toggle key={x.name} selected={selected === x.name} onClick={() => fn(dictkey, x.name)} icon={x.icon} name={x.name} />
                    })
                }
            </span>
        </div>
    )
}