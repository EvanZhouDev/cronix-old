import styles from "./titlebar.module.css"
import Link from "next/link"
export default ({ name, icon, href }) => {
    return (
        <Link href={href} className={styles.option}>
            {icon}
            <span className={styles.name}>{name}</span>
        </Link>
    )
}   