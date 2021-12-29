import { ObjectId } from "mongodb";
import { BaseRequest, BaseResponse, BaseConf } from "./base";

export interface ReqAddCart extends BaseRequest {
    userId:ObjectId;
    goodId:ObjectId;
    goodNum:number;
}

export interface ResAddCart extends BaseResponse {
    
}

export const conf: BaseConf = {
    
}