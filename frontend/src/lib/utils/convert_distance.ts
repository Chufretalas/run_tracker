import DistUnit from "../types/distance_units";

export default function convertDistance(distance: number, startingUnit: DistUnit, finalUnit: DistUnit): number {
    switch (startingUnit) {
        case DistUnit.m:
            distance = distance / 1000
            break;

        case DistUnit.miles:
            distance = distance * 1.609
            break;
    }

    switch (finalUnit) {
        case DistUnit.m:
            distance = distance * 1000
            break;
        case DistUnit.miles:
            distance = distance / 1.609
            break;
    }

    return distance
}