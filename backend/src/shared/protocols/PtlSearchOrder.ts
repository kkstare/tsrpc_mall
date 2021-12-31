import { ObjectId } from "mongodb";
import { BaseRequest, BaseResponse, BaseConf } from "./base";

export interface ReqSearchOrder extends BaseRequest {
    userId?:ObjectId
    timeLimit?:{
        beginTime:number,
        endTime:number
    }
}

export interface ResSearchOrder extends BaseResponse {
    code:number,
    orders:any[]
}

export const conf: BaseConf = {
    
}