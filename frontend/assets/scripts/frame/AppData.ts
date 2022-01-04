import { BaseData } from "./data/BaseData"



export default class AppData extends BaseData {

    constructor() {
      super()
    }


    private _agentId: number
    public get agentId(): number {
        return this._agentId
    }
    public set agentId(value: number) {
        this._agentId = value
    }



}
