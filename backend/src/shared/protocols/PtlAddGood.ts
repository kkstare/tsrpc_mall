import { BaseRequest, BaseResponse, BaseConf } from "./base";

export interface ReqAddGood extends BaseRequest {
    Name:string;
    Des:string;
    price:number;
    restNum:number;
}

export interface ResAddGood extends BaseResponse {
    code:number;
    msg:string;
}

export const conf: BaseConf = {
    
}