import Option from "../option.js"
import Logo from "./logo.js"
import Marginal from "../index.js"
import { FiClock, FiHelpCircle, FiBarChart2, FiInfo } from "react-icons/fi";
export default function Titlebar() {
    return (
        <Marginal>
            <Logo/>
            <Option icon=<FiClock size={20} /> name="Timer" href="/"/>
            <Option icon=<FiBarChart2 size={20} /> name="Statistics" href="/stats"/>
            <Option icon=<FiHelpCircle size={20} /> name="Help" href="/help"/>
            <Option icon=<FiInfo size={20} /> name="About" href="/about" />
        </Marginal>
    )
}