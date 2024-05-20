import { useEffect, useState } from "react";
import { main } from "../../../../wailsjs/go/models";
import DefaultDialog from "../DefaultDialog/DefaultDialog";
import DistUnit from "../../types/distance_units";
import convertDistance from "../../utils/convert_distance";
import { UpdateRun } from "../../../../wailsjs/go/main/App";

import styles from "./EditRunDialog.module.css"

export default function EditRunDialog({ run, isOpen, onClose, onSaveRun }
    : { run: main.Run, isOpen: boolean, onClose: () => void, onSaveRun: () => Promise<void> }) {
    const [day, setDay] = useState<string>("")
    const [distance, setDistance] = useState<number>(0)
    const [distanceUnit, setDistanceUnit] = useState<DistUnit>(DistUnit.Km)
    const [time, setTime] = useState<number>(0)
    const [timeVO2, setTimeVO2] = useState<number>(0)
    const [avgBPM, setAvgBPM] = useState<number>(0)

    useEffect(() => {
        setDay(run.day)
        setDistance(run.distance)
        setTime(run.time)
        setTimeVO2(run.time_vo2)
        setAvgBPM(run.avg_bpm)
    }, [run])

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
        const updatedRun = new main.Run()
        updatedRun.id = run.id
        updatedRun.day = day
        updatedRun.distance = convertDistance(distance, distanceUnit, DistUnit.Km)
        updatedRun.time = time
        updatedRun.time_vo2 = timeVO2
        updatedRun.avg_bpm = avgBPM

        await UpdateRun(updatedRun)
        await onSaveRun()
        resetForm()
        onClose()
    }

    return (
        <DefaultDialog title={`Edit run (id: ${run.id})`} isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <fieldset>
                    <label htmlFor="edit_day">*Day of the run</label>
                    <input type="date" name="edit_day" id="edit_day"
                        value={day} onChange={(v) => setDay(v.currentTarget.value)} required />
                </fieldset>
                <div>
                    <fieldset>
                        <label htmlFor="edit_distance">*Distance ran</label>
                        <input type="number" id='edit_distance' name='edit_distance'
                            value={distance == 0 ? "" : distance} onChange={(v) => setDistance(+v.currentTarget.value)} required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="edit_distance_unit">Distance unit</label>
                        <select id="edit_distance_unit" name="edit_distance_unit"
                            value={distanceUnit} onChange={(v) => setDistanceUnit(v.currentTarget.value as DistUnit)}>
                            <option value={DistUnit.Km}>Km</option>
                            <option value={DistUnit.miles}>miles</option>
                            <option value={DistUnit.m}>m</option>
                        </select>
                    </fieldset>
                </div>
                <fieldset>
                    <label htmlFor="edit_time">*Time (minutes)</label>
                    <input type="number" id='edit_time' name='edit_time'
                        value={time == 0 ? "" : time} onChange={(v) => setTime(+v.currentTarget.value)} required />
                </fieldset>
                <fieldset>
                    <label htmlFor="edit_time_vo2">Time in VO2 max (minutes)</label>
                    <input type="number" id='edit_time_vo2' name='edit_time_vo2'
                        value={timeVO2 == 0 ? "" : timeVO2} onChange={(v) => setTimeVO2(+v.currentTarget.value)} />
                </fieldset>
                <fieldset>
                    <label htmlFor="edit_avg_bpm">Average heart beat (bpm)</label>
                    <input type="number" id='edit_avg_bpm' name='edit_avg_bpm'
                        value={avgBPM == 0 ? "" : avgBPM} onChange={(v) => setAvgBPM(+v.currentTarget.value)} />
                </fieldset>
                <button type='submit' className={styles.submit_button}>Submit!</button>
            </form>
        </DefaultDialog>
    )
}