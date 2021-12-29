import { ObjectId } from "mongodb";
import { BaseRequest, BaseResponse, BaseConf } from "./base";

export enum USERTYPR{
    CUSTOMER,
    BUSINESS
}
export interface ReqLogin extends BaseRequest {
    username: string;
    pwd:string;
}

export interface ResLogin extends BaseResponse {
    useId:ObjectId;
    code: number;
    msg:string;
    type:USERTYPR;
    money:number
}

export const conf: BaseConf = {
    
}