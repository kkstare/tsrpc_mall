import { ObjectId } from "mongodb";
import { BaseRequest, BaseResponse, BaseConf } from "./base";

export interface ReqBuyGoods extends BaseRequest {
    userId:ObjectId;
    cart:{
        goodId:ObjectId,
        goodNum:number,
    }[]
}

export interface ResBuyGoods extends BaseResponse {
    code:number
    msg:string
    curMoney:number
}

export const conf: BaseConf = {
    
}