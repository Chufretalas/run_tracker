import { main } from "../../../wailsjs/go/models"

export default interface IMonthRunGroup {
    month: string
    runs: main.Run[]
}