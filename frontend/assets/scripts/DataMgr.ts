import { ObjectId } from "mongodb";
import { C_EVENT } from "./Enums";

class DataMgr{


    public userId:ObjectId
    private _money: number;
    public get money(): number {
        return this._money;
    }
    public set money(value: number) {
        if(this._money == value){
            return
        }
        this._money = value;
        cc.game.emit(C_EVENT.CHANGE_MONET,this._money)
    }

    private static _ins:DataMgr;
    public static get ins():DataMgr {
        if(!DataMgr._ins){
            DataMgr._ins = new DataMgr()
        }
        return DataMgr._ins;
    }

    constructor(){

    }

}

export default DataMgr.ins