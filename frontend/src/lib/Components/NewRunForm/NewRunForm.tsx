import { useState } from "react"
import { SaveRun } from "../../../../wailsjs/go/main/App"
import convertDistance from "../../utils/convert_distance"
import DistUnit from "../../types/distance_units"
import { main } from "../../../../wailsjs/go/models"

import styles from "./NewRunForm.module.css"

export default function NewRunForm({onSaveRun}: {onSaveRun: () => Promise<void>}) {
    const [day, setDay] = useState<string>("")
    const [distance, setDistance] = useState<number>(0)
    const [distanceUnit, setDistanceUnit] = useState<DistUnit>(DistUnit.Km)
    const [time, setTime] = useState<number>(0)
    const [timeVO2, setTimeVO2] = useState<number>(0)
    const [avgBPM, setAvgBPM] = useState<number>(0)

    function resetForm() {
        setDay("")
        setDistance(0)
        setDistanceUnit(DistUnit.Km)
        setTime(0)
        setTimeVO2(0)
        setAvgBPM(0)
    }

    async function handleSubmit(e: any) {
        e.preventDefault()
        e.target.reset()
        const run = new main.Run()
        run.day = day
        run.distance = convertDistance(distance, distanceUnit, DistUnit.Km)
        run.time = time
        run.time_vo2 = timeVO2
        run.avg_bpm = avgBPM

        await SaveRun(run)
        await onSaveRun()
        resetForm()
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <fieldset>
                <label htmlFor="day">Day of the run</label>
                <input type="date" name="day" id="day"
                    value={day} onChange={(v) => setDay(v.currentTarget.value)} />
            </fieldset>
            <div>
                <fieldset>
                    <label htmlFor="distance">Distance ran</label>
                    <input type="number" id='distance' name='distance'
                        value={distance == 0 ? "" : distance} onChange={(v) => setDistance(+v.currentTarget.value)} />
                </fieldset>
                <fieldset>
                    <label htmlFor="distance_unit">Distance unit</label>
                    <select id="distance_unit" name="distance_unit"
                        value={distanceUnit} onChange={(v) => setDistanceUnit(v.currentTarget.value as DistUnit)}>
                        <option value={DistUnit.Km}>Km</option>
                        <option value={DistUnit.miles}>miles</option>
                        <option value={DistUnit.m}>m</option>
                    </select>
                </fieldset>
            </div>
            <fieldset>
                <label htmlFor="time">Time (minutes)</label>
                <input type="number" id='time' name='time'
                    value={time == 0 ? "" : time} onChange={(v) => setTime(+v.currentTarget.value)} />
            </fieldset>
            <fieldset>
                <label htmlFor="time_vo2">Time in VO2 max (minutes)</label>
                <input type="number" id='time_vo2' name='time_vo2'
                    value={timeVO2 == 0 ? "" : timeVO2} onChange={(v) => setTimeVO2(+v.currentTarget.value)} />
            </fieldset>
            <fieldset>
                <label htmlFor="avg_bpm">Average heart beat (bpm)</label>
                <input type="number" id='avg_bpm' name='avg_bpm'
                    value={avgBPM == 0 ? "" : avgBPM} onChange={(v) => setAvgBPM(+v.currentTarget.value)} />
            </fieldset>
            <button type='submit' className={styles.submit_button}>Submit!</button>
        </form>
    )
}