import { FormEvent, useState } from 'react';
import styles from './App.module.css';

export default function App() {

    const [day, setDay] = useState<string>()
    const [distance, setDistance] = useState<number>()
    const [distanceUnit, setDistanceUnit] = useState("Km")
    const [avgSpeed, setAvgSpeed] = useState<number>()
    const [avgSpeedUnit, setAvgSpeedUnit] = useState("Km/h")
    const [time, setTime] = useState<number>()
    const [timeVO2, setTimeVO2] = useState<number>()
    const [avgBPM, setAvgBPM] = useState<number>()

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <label htmlFor="day">Day of the run</label>
                <input type="date" name="day" id="day"
                    value={day} onChange={(v) => setDay(v.currentTarget.value)} />
            </fieldset>
            <div>
                <fieldset>
                    <label htmlFor="distance">Distance ran</label>
                    <input type="number" id='distance' name='distance'
                        value={distance} onChange={(v) => setDistance(+v.currentTarget.value)} />
                </fieldset>
                <fieldset>
                    <label htmlFor="distance_unit">Distance unit</label>
                    <select id="distance_unit" name="distance_unit"
                        value={distanceUnit} onChange={(v) => setDistanceUnit(v.currentTarget.value)}>
                        <option value="Km">Km</option>
                        <option value="miles">miles</option>
                        <option value="miles">m</option>
                    </select>
                </fieldset>
            </div>
            <div>
                <fieldset>
                    <label htmlFor="avg_speed">Average speed</label>
                    <input type="number" id='avg_speed' name='distance'
                        value={avgSpeed} onChange={(v) => setAvgSpeed(+v.currentTarget.value)} />
                </fieldset>
                <fieldset>
                    <label htmlFor="avg_speed_unit">Average speed unit</label>
                    <select id="distance_unit" name="distance_unit"
                        value={avgSpeedUnit} onChange={(v) => setAvgSpeedUnit(v.currentTarget.value)}>
                        <option value="Km/h">Km/h</option>
                        <option value="miles/h">miles/h</option>
                        <option value="m/s">m/s</option>
                    </select>
                </fieldset>
            </div>
            <fieldset>
                <label htmlFor="time">Time (minutes)</label>
                <input type="number" id='time' name='time'
                    value={time} onChange={(v) => setTime(+v.currentTarget.value)} />
            </fieldset>
            <fieldset>
                <label htmlFor="time_vo2">Time in VO2 max (minutes)</label>
                <input type="number" id='time_vo2' name='time_vo2'
                    value={timeVO2} onChange={(v) => setTimeVO2(+v.currentTarget.value)} />
            </fieldset>
            <fieldset>
                <label htmlFor="avg_bpm">Average heart beat (bpm)</label>
                <input type="number" id='avg_bpm' name='avg_bpm'
                    value={avgBPM} onChange={(v) => setAvgBPM(+v.currentTarget.value)} />
            </fieldset>
        </form>
    )
}