import styles from "./scramble.module.css"

export default function Scramble({scramble}) {
    return (
        <div className={styles.scramble}>
            {scramble}
        </div>
    )
}