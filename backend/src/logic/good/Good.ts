import { DbGood } from "../../shared/dbType/DbGood"


export default class Good{
    dbInfo:DbGood
    constructor(goodInfo){
        this.dbInfo.name = goodInfo.Name
        this.dbInfo.des = goodInfo.Des
        this.dbInfo.price = goodInfo.price
        this.dbInfo.restNum = goodInfo.restNum
    }

    getPirce(){
        // this.dbInfo.price *
    }

}