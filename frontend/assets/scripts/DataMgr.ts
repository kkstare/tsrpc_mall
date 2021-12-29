import { ObjectId } from "mongodb";

class DataMgr{
    public userId:ObjectId
    public money:number

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