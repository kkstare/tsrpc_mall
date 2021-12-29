import { ObjectId } from "mongodb";
import { BaseRequest, BaseResponse, BaseConf } from "./base";

export interface ReqGetCart extends BaseRequest {
    userId:ObjectId
}

export interface ResGetCart extends BaseResponse {
    code:number
    cart:{
        goodId:ObjectId,
        goodNum:number
    }[]
}

export const conf: BaseConf = {
    
}