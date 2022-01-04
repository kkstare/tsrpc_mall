import { ObjectId } from "mongodb";

export default class DbGood{
    constructor(){

    }
    _id:ObjectId
    name:string
    des:string
    price:number
    restNum:number
}