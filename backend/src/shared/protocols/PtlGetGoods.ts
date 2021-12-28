import { BaseRequest, BaseResponse, BaseConf } from "./base";

export interface ReqGetGoods extends BaseRequest {
    
}

export interface ResGetGoods extends BaseResponse {
    code: number;
    msg:string;
    data:any;
}

export const conf: BaseConf = {
    
}