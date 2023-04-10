import Link from "next/link"
import styles from "./marginals.module.css"

export default ({ name, icon, href }) => {
    return (
        <Link href={href} className={styles.option}>
            {icon}
            <span className={styles.name}>{name}</span>
        </Link>
    )
}   