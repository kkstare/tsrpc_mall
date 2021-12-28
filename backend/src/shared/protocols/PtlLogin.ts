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
    code: number;
    msg:string;
    type:USERTYPR;
}

export const conf: BaseConf = {
    
}