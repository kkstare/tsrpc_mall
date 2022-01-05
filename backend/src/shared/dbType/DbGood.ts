import { ObjectId } from "mongodb";

export type DbGood={
    _id:ObjectId
    name:string
    des:string
    price:number
    restNum:number
}