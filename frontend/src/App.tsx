import { useEffect, useState } from 'react';
import styles from './App.module.css';

import { SaveRun, GetAllRuns } from "../wailsjs/go/main/App"
import { main } from "../wailsjs/go/models"
import convertDistance from './lib/utils/convert_distance';
import DistUnit from './lib/types/distance_units';
import VelUnit from './lib/types/velocity_units';
import calcVelocity from './lib/utils/calcVelocity';
import NewRunForm from './lib/Components/NewRunForm';

export default function App() {

    const [prevDistanceUnit, setPrevDistanceUnit] = useState<DistUnit>(DistUnit.Km)
    const [prevVelocityUnit, setPrevVelocityUnit] = useState<VelUnit>(VelUnit.KmH)
    const [allRuns, setAllRuns] = useState<main.Run[]>([])

    useEffect(() => {
        GetAllRuns().then(res => setAllRuns(res ?? []))
    }, [])


    return (
        <main className={styles.main}>
            <section>
                <h1 className={styles.section_title}>Register a new run</h1>
                <NewRunForm onSaveRun={async () => {
                    const newAllRuns = await GetAllRuns()
                    setAllRuns(newAllRuns)
                }} />
            </section>
            <section>
                <h1 className={styles.section_title}>Previous Runs</h1>
                <div>
                    <label htmlFor="previous_distance_unit">Distance Unit</label>
                    <select id="previous_distance_unit" name="previous_distance_unit"
                        value={prevDistanceUnit} onChange={(v) => setPrevDistanceUnit(v.currentTarget.value as DistUnit)}>
                        <option value={DistUnit.Km}>Km</option>
                        <option value={DistUnit.miles}>miles</option>
                        <option value={DistUnit.m}>m</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="previous_velocity_unit">Velocity Unit</label>
                    <select id="previous_velocity_unit" name="previous_velocity_unit"
                        value={prevVelocityUnit} onChange={(v) => setPrevVelocityUnit(v.currentTarget.value as VelUnit)}>
                        <option value={VelUnit.KmH}>Km/h</option>
                        <option value={VelUnit.milesH}>miles/h</option>
                        <option value={VelUnit.mS}>m/s</option>
                    </select>
                </div>
                <ul>
                    {allRuns.map((run, idx) => (
                        <li key={idx}>
                            <span>Day: {run.day}</span>
                            <span>Distance: {convertDistance(run.distance, DistUnit.Km, prevDistanceUnit).toFixed(2)} {prevDistanceUnit}</span>
                            <span>Time: {run.time} minutes</span>
                            <span>Avg. Velocity: {calcVelocity(run.distance, DistUnit.Km, run.time, prevVelocityUnit).toFixed(2)} {prevVelocityUnit}</span>
                            <span>Time in VO2 máx: {run.time_vo2}</span>
                            <span>Avg. BPM: {run.avg_bpm}</span>
                        </li>
                    ))}
                </ul>
            </section>
            <section>
                Right stuff
            </section>
        </main>
    )
}