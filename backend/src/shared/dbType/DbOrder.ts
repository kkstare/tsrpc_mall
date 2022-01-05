import { ObjectId } from "mongodb"

export default class DbOrder{
    _id:ObjectId
    products:productInfo[]
    createTime:number
    totalPrice:number
    userId:ObjectId
    constructor(products:productInfo[],totalPrice:number,userId:ObjectId){
        this.products = products
        this.createTime = Date.now()
        this.totalPrice = totalPrice
        this.userId = userId
    }

}

export type productInfo = {
    goodId:ObjectId,
    dealPrice:number,
    dealNum:number,
    dealAllPrice:number
}
