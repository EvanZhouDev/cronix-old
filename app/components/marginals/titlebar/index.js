import Option from "../option.js"
import Logo from "./logo.js"
import Marginal from "../index.js"
import styles from "./titlebar.module.css"
import { FiClock, FiHelpCircle, FiBarChart2 } from "react-icons/fi";
export default () => {
    return (
        <Marginal>
            <Logo/>
            <Option icon=<FiClock size={20} /> name="Timer" href="/"/>
            <Option icon=<FiBarChart2 size={20} /> name="Statistics" href="/stats"/>
            <Option icon=<FiHelpCircle size={20} /> name="Help" href="/help"/>
        </Marginal>
    )
}