import Option from "../option.js"
import Version from "./version.js"
import Marginal from "../index.js"
import styles from "./footer.module.css"
import { FiGithub, FiBook } from "react-icons/fi";

export default function Footer() {
    return (
        <Marginal>
            <div className={styles.links}>
                <Option icon=<FiGithub size={20} /> name="Github" href="https://github.com"/>
                <Option icon=<FiBook size={20} /> name="License" href="https://youtube.com"/>
            </div>
            <Version />
        </Marginal>
    )
}