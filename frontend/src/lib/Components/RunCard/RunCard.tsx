import { main } from "../../../../wailsjs/go/models";
import DistUnit from "../../types/distance_units";
import VelUnit from "../../types/velocity_units";
import calcVelocity from "../../utils/calcVelocity";
import convertDistance from "../../utils/convert_distance";

import styles from "./RunCard.module.css"

export default function RunCard({ run, distUnit, velUnit, openEdit }
    : { run: main.Run, distUnit: DistUnit, velUnit: VelUnit, openEdit: (run: main.Run) => void }) {
    return (
        <li className={styles.li}>
            <div className={styles.card_header}>
                <span />
                <span className={styles.day}><b>Day:</b> {run.day}</span>
                <span className={styles.id_span}>id: {run.id}</span>
            </div>
            <div className={styles.inner_wrapper}>
                <div className={styles.data_div}>
                    <span className={styles.distance}><b>Distance:</b> {convertDistance(run.distance, DistUnit.Km, distUnit).toFixed(2)} {distUnit}</span>
                    <span className={styles.time}><b>Time:</b> {run.time} minutes</span>
                    <span className={styles.velocity}><b>Avg. Velocity:</b> {calcVelocity(run.distance, DistUnit.Km, run.time, velUnit).toFixed(2)} {velUnit}</span>
                    <span className={styles.vo2}><b>Time in VO2 máx:</b> {run.time_vo2} minutes</span>
                    <span className={styles.bpm}><b>Avg. BPM:</b> {run.avg_bpm} bpm</span>
                </div>
                <div className={styles.buttons_div}>
                    <button onClick={() => openEdit(run)} className={styles.edit_button} title="Edit run">🖊</button>
                </div>
            </div>
        </li>
    )
}