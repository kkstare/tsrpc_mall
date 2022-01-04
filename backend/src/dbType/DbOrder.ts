import { ObjectId } from "mongodb"

export default class DbOrder{
    _id:ObjectId
    products:productInfo[]
    createTime:number
    totalPrice:number

    constructor(products:productInfo[],createTime:number,totalPrice:number){
        this.products = products
        this.createTime = createTime
        this.totalPrice = totalPrice
    }

}

export type productInfo = {
    goodId:ObjectId,
    dealPrice:number,
    dealNum:number,
    dealAllPrice:number
}
