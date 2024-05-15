import { useState } from 'react';
import styles from './App.module.css';

import { PrintAllRuns, SaveRun } from "../wailsjs/go/main/App"

export default function App() {

    const [day, setDay] = useState<string>("")
    const [distance, setDistance] = useState<number>(0)
    const [distanceUnit, setDistanceUnit] = useState("Km")
    const [time, setTime] = useState<number>(0)
    const [timeVO2, setTimeVO2] = useState<number>(0)
    const [avgBPM, setAvgBPM] = useState<number>(0)

    function resetForm() {
        setDay("")
        setDistance(0)
        setDistanceUnit("Km")
        setTime(0)
        setTimeVO2(0)
        setAvgBPM(0)
    }

    async function handleSubmit(e: any) {
        e.preventDefault()
        e.target.reset()
        await SaveRun(day, distance, distanceUnit, time, timeVO2, avgBPM)
        await PrintAllRuns()
        resetForm()
    }

    return (
        <main className={styles.main}>
            <section>
                <h1 className={styles.section_title} onClick={() => PrintAllRuns()}>Register a new run</h1>
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
                                value={distanceUnit} onChange={(v) => setDistanceUnit(v.currentTarget.value)}>
                                <option value="Km">Km</option>
                                <option value="miles">miles</option>
                                <option value="m">m</option>
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
            </section>
            <section>
                <h2>Whereas recognition</h2>
                Main stuff
            </section>
            <section>
                Right stuff
            </section>
        </main>
    )
}