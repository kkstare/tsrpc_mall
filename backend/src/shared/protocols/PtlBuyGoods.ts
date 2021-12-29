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
}

export const conf: BaseConf = {
    
}