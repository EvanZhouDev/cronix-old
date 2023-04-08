import styles from "./bar.module.css"
import Selection from "./selection.js"
import Toggle from "./toggle.js"
import Divider from "./divider.js"
import { FiBox, FiClock, FiWatch, FiMic, FiMoreVertical } from "react-icons/fi";
export default () => {
    return (
        <div className={styles.bar}>
            <Selection>
                <Toggle selected name="3x3" icon=<FiBox size={15} /> />
                <Toggle name="4x4" icon=<FiBox size={15} /> />
                <Toggle name="More" icon=<FiMoreVertical size={15} /> />
            </Selection>
            <Divider />
            <Selection>
                <Toggle selected name="Timer" icon=<FiWatch size={15} /> />
                <Toggle name="Stackmat" icon=<FiMic size={15} /> />
            </Selection>
        </div>
    )
}