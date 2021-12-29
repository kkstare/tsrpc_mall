import { ObjectId } from "mongodb";
import { BaseRequest, BaseResponse, BaseConf } from "./base";

export interface ReqEditGood extends BaseRequest {
    _id:ObjectId;
    Name:string;
    Des:string;
    price:number;
    restNum:number;
}

export interface ResEditGood extends BaseResponse {
    code:number;
    msg:string;
}

export const conf: BaseConf = {
    
}