import { atom } from "recoil";
import { main } from "../../../wailsjs/go/models";

export const allRunsAtom = atom<main.Run[]>({
    key: "allRuns",
    default: []
})