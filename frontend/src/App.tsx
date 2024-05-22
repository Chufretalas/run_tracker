import { useEffect, useState } from 'react';
import styles from './App.module.css';

import { DeleteRun, GetAllRuns } from "../wailsjs/go/main/App"
import { main } from "../wailsjs/go/models"
import DistUnit from './lib/types/distance_units';
import SpeedUnit from './lib/types/speed_units';
import NewRunForm from './lib/Components/NewRunForm/NewRunForm';
import RunCard from './lib/Components/RunCard/RunCard';
import EditRunDialog from './lib/Components/EditRunDialog/EditRunDialog';
import { useRecoilState } from 'recoil';
import { allRunsAtom } from './lib/atoms/run_stuff';
import StatsSection from './lib/Components/StatsSection/StatsSection';
import ConfirmDeleteDialog from './lib/Components/ConfirmDeleteDialog/ConfirmDeleteDialog';

//TODO: oldest/newest run toggle, I can do it with just css
//TODO: pagination and a separator for cards from different months

export default function App() {

    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false)
    const [activeRun, setActiveRun] = useState<main.Run>(new main.Run)

    const [askDeleteDialogIsOpen, setAskDeleteDialogIsOpen] = useState(false)
    const [shouldAskToDelete, setShouldAskToDelete] = useState(true)

    const [prevDistanceUnit, setPrevDistanceUnit] = useState<DistUnit>(DistUnit.Km)
    const [prevSpeedUnit, setPrevSpeedUnit] = useState<SpeedUnit>(SpeedUnit.KmH)
    const [allRuns, setAllRuns] = useRecoilState<main.Run[]>(allRunsAtom)

    useEffect(() => {
        GetAllRuns().then(res => setAllRuns(res ?? []))
    }, [])

    useEffect(() => {
        if (!shouldAskToDelete) {
            setTimeout(() => setShouldAskToDelete(true), 120000)
        }
    }, [shouldAskToDelete])


    return (
        <>
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
                            <label htmlFor="previous_speed_unit">Speed Unit</label>
                            <select id="previous_speed_unit" name="previous_speed_unit"
                                value={prevSpeedUnit} onChange={(v) => setPrevSpeedUnit(v.currentTarget.value as SpeedUnit)}>
                                <option value={SpeedUnit.KmH}>Km/h</option>
                                <option value={SpeedUnit.milesH}>miles/h</option>
                                <option value={SpeedUnit.mS}>m/s</option>
                            </select>
                        </div>
                    </div>
                    <ul className={styles.run_list}>
                        {allRuns.map((run, idx) => (
                            <RunCard key={idx} run={run} distUnit={prevDistanceUnit} speedUnit={prevSpeedUnit}
                                openEdit={(run) => {
                                    setActiveRun(new main.Run(run))
                                    setEditDialogIsOpen(true)
                                }}
                                deleteRun={async (runId) => {
                                    setActiveRun(new main.Run(run))
                                    if (shouldAskToDelete) {
                                        setAskDeleteDialogIsOpen(true)
                                        return
                                    }
                                    await DeleteRun(runId)
                                    const newAllRuns = await GetAllRuns()
                                    setAllRuns(newAllRuns)
                                }}
                            />
                        ))}
                    </ul>
                </section>
                <section>
                    <h1 className={styles.section_title} style={{ color: "#2d97f5" }}>Stats</h1>
                    <StatsSection />
                </section>
            </main>
            <EditRunDialog run={activeRun} isOpen={editDialogIsOpen} onClose={() => { setEditDialogIsOpen(false) }}
                onSaveRun={async () => {
                    const newAllRuns = await GetAllRuns()
                    setAllRuns(newAllRuns)
                }} />
            <ConfirmDeleteDialog runId={activeRun.id} isOpen={askDeleteDialogIsOpen}
                onClose={async (confirmDeletion, stopAsking) => {
                    setAskDeleteDialogIsOpen(false)
                    setShouldAskToDelete(!stopAsking)
                    if (confirmDeletion) {
                        await DeleteRun(activeRun.id)
                        const newAllRuns = await GetAllRuns()
                        setAllRuns(newAllRuns)
                    }
                }} />
        </>
    )
}