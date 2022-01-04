import { ObjectId } from "mongodb";
import { type } from "os";

export default class DbUsers{
    constructor(userName,pwd){
        this.userName = userName
        this.pwd = pwd
        this.cart = []
        this.money = 0
    }
    _id:ObjectId
    userName:string
    pwd:string
    cart:goodInfo[]
    money:number

}

export type goodInfo = {
    goodId:ObjectId
    goodNum:number
}





