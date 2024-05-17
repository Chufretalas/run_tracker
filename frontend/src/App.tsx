import { useEffect, useState } from 'react';
import styles from './App.module.css';

import { GetAllRuns } from "../wailsjs/go/main/App"
import { main } from "../wailsjs/go/models"
import DistUnit from './lib/types/distance_units';
import VelUnit from './lib/types/velocity_units';
import NewRunForm from './lib/Components/NewRunForm/NewRunForm';
import RunCard from './lib/Components/RunCard/RunCard';

//TODO: oldest/newest run toggle, I can do it with just css

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
                <h1 className={styles.section_title} style={{ color: "#f8d435" }}>Previous Runs</h1>
                <div className={styles.prev_config}>
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
                </div>
                <ul className={styles.run_list}>
                    {allRuns.map((run, idx) => (
                        <RunCard key={idx} run={run} distUnit={prevDistanceUnit} velUnit={prevVelocityUnit} />
                    ))}
                </ul>
            </section>
            <section>
                Right stuff
            </section>
        </main>
    )
}