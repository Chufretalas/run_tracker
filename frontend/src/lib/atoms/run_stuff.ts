import { atom, selector } from "recoil";
import { main } from "../../../wailsjs/go/models";
import IMonthRunGroup from "../types/IMonthRunGroup";

export const allRunsAtom = atom<main.Run[]>({
    key: "allRuns",
    default: []
})

// such a nasty algorithm, I'm sorry for anyone who reads this foul thing
export const allRunsByMonthSelector = selector<IMonthRunGroup[]>({
    key: "allRunsByMontg",
    get: ({ get }) => {
        const allRuns = get(allRunsAtom)

        const uniqueMonths: string[] = []

        allRuns.forEach(run => {
            const month = run.day.slice(0, 7) // YYYY-MM
            if (!uniqueMonths.includes(month)) {
                uniqueMonths.push(month)
            }
        })

        return uniqueMonths.map(month => {
            return {
                month: month,
                runs: allRuns.filter(run => run.day.startsWith(month))
            }
        })
    }
})