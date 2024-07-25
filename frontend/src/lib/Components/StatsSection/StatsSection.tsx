import { useState } from "react"
import styles from "./StatsSection.module.css"
import date_to_month from "../../utils/date_to_month"
import { useRecoilValue } from "recoil"
import { allRunsByMonthSelector } from "../../atoms/run_stuff"

//TODO: add other metrics
//TODO: add a button to navigate to a windows with graphs
export default function StatsSection() {

    const [activeMonth, setActiveMonth] = useState(date_to_month(new Date()))

    const allRunsGroups = useRecoilValue(allRunsByMonthSelector)

    return (
        <div className={styles.main}>
            <h1>Month: {activeMonth}</h1>
            <span>Total distance ran: {allRunsGroups.find(group => group.month === activeMonth)?.runs.reduce((acc, crr) => acc + crr.distance, 0).toFixed(2)}</span>
        </div>
    )
}