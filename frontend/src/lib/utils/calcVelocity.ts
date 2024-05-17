import DistUnit from "../types/distance_units";
import VelUnit from "../types/velocity_units";
import convertDistance from "./convert_distance";

export default function calcVelocity(distance: number, distanceUnit: DistUnit, time: number, velocityUnit: VelUnit): number {
    switch (velocityUnit) {
        case VelUnit.KmH:
            return convertDistance(distance, distanceUnit, DistUnit.Km) / (time / 60)
        case VelUnit.milesH:
            return convertDistance(distance, distanceUnit, DistUnit.miles) / (time / 60)
        case VelUnit.mS:
            return convertDistance(distance, distanceUnit, DistUnit.m) / (time * 60)

        default:
            console.error("something went wrong while calculating a velocity", distance, distanceUnit, time, velocityUnit)
            return 0
    }
}