import { ObjectId } from "mongodb";
import  {DbGood}  from "../dbType/DbGood";
// import Good from "../../logic/good/Good";

import { BaseRequest, BaseResponse } from "./base";

export interface ReqGetCart extends BaseRequest {
    userId:ObjectId
}

export interface ResGetCart extends BaseResponse {
    code:number
    cart:cardProductType[]
}

export type cardProductType = {
    _id:ObjectId
    name:string
    des:string
    price:number
    restNum:number
    goodNum:number

}
