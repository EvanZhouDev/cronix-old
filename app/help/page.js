import styles from "./help.module.css"
export default function Page() {
    return (
        <div className={styles.helpPage}>
            <h1>The Design Behind CRONIX</h1>
            "Not another cube timer," you say, "We'll wind up using CSTimer again in the end"
            <br/>
            <br/>
            The idea behind CRONIX is that timing and cubing should be two seperate things. We shouldn't be distracted by analyzing our data as we are doing our solves. 
        </div>
    )
}