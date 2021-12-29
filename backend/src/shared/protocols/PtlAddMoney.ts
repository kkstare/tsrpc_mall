import { ObjectId } from "mongodb";
import { BaseRequest, BaseResponse, BaseConf } from "./base";

export interface ReqAddMoney extends BaseRequest {
    userId:ObjectId
    addMoney:number
}

export interface ResAddMoney extends BaseResponse {
    code:number
}

export const conf: BaseConf = {
    
}