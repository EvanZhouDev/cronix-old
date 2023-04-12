import styles from "./bar.module.css";
import Toggle from "./toggle.js"
export default function Dropdown({ icon, name, data }) {
    return (
        <div className={styles.dropdownParent}>
            <Toggle icon={icon} name={name} />
            <span className={styles.dropdown}>
                {
                    data.map(x => {
                        return <Toggle icon={x.icon} name={x.name} />
                    })
                }
            </span>
        </div>
    )
}