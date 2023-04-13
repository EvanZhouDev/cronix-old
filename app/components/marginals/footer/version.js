import styles from "./footer.module.css"
import { name } from "../marginals.module.css"
import { FiGitMerge } from "react-icons/fi"

export default function Version() {
    return (
        <span className={styles.version}>
            <FiGitMerge size={20} />
            <span className={name}>Pre-Alpha: SEMVAR TBA</span>
        </span>
    )
}