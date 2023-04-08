import Link from "next/link"
import styles from "./footer.module.css"

export default ({ name, icon, href }) => {
    return (
        <Link href={href} className={styles.URL}>
            {icon}
            <span className={styles.name}>{name}</span>
        </Link>
    )
}   