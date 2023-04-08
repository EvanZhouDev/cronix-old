import URL from "./URL.js"
import Version from "./version.js"

import styles from "./footer.module.css"
import { FiGithub, FiBook } from "react-icons/fi";
export default () => {
    return (
        <div className={styles.footer}>
            <div className={styles.links}>
                <URL icon=<FiGithub size={20} /> name="Github" href="https://github.com"/>
                <URL icon=<FiBook size={20} /> name="License" href="https://youtube.com"/>
            </div>
            <Version />
        </div>
    )
}