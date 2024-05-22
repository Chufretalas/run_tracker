import DistUnit from "../types/distance_units";
import SpeedUnit from "../types/speed_units";
import convertDistance from "./convert_distance";

export default function calcSpeed(distance: number, distanceUnit: DistUnit, time: number, speedUnit: SpeedUnit): number {
    switch (speedUnit) {
        case SpeedUnit.KmH:
            return convertDistance(distance, distanceUnit, DistUnit.Km) / (time / 60)
        case SpeedUnit.milesH:
            return convertDistance(distance, distanceUnit, DistUnit.miles) / (time / 60)
        case SpeedUnit.mS:
            return convertDistance(distance, distanceUnit, DistUnit.m) / (time * 60)

        default:
            console.error("something went wrong while calculating a speed", distance, distanceUnit, time, speedUnit)
            return 0
    }
}