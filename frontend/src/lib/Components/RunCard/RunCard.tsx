import { main } from "../../../../wailsjs/go/models";
import DistUnit from "../../types/distance_units";
import SpeedUnit from "../../types/speed_units";
import calcSpeed from "../../utils/calcSpeed";
import convertDistance from "../../utils/convert_distance";

import styles from "./RunCard.module.css"

export default function RunCard({ run, distUnit, speedUnit, openEdit, deleteRun }
    : { run: main.Run, distUnit: DistUnit, speedUnit: SpeedUnit, openEdit: (run: main.Run) => void, deleteRun: (runId: number) => void }) {
    return (
        <div className={styles.div}>
            <div className={styles.card_header}>
                <span />
                <span className={styles.day}><b>Day:</b> {run.day}</span>
                <span className={styles.id_span}>id: {run.id}</span>
            </div>
            <div className={styles.inner_wrapper}>
                <div className={styles.data_div}>
                    <span className={styles.distance}><b>Distance:</b> {convertDistance(run.distance, DistUnit.Km, distUnit).toFixed(2)} {distUnit}</span>
                    <span className={styles.time}><b>Time:</b> {run.time} minutes</span>
                    <span className={styles.speed}><b>Avg. Speed:</b> {calcSpeed(run.distance, DistUnit.Km, run.time, speedUnit).toFixed(2)} {speedUnit}</span>
                    <span className={styles.vo2}><b>Time in VO2 máx:</b> {run.time_vo2} minutes</span>
                    <span className={styles.bpm}><b>Avg. BPM:</b> {run.avg_bpm} bpm</span>
                </div>
                <div className={styles.buttons_div}>
                    <button onClick={() => deleteRun(run.id)} className={styles.delete_button} title="Delete run">🗑</button>
                    <button onClick={() => openEdit(run)} className={styles.edit_button} title="Edit run">🖊</button>
                </div>
            </div>
        </div>
    )
}