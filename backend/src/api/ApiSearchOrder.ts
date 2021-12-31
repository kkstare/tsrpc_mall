import { ApiCall } from "tsrpc";
import { DbMgr } from "../Db";
import { ReqSearchOrder, ResSearchOrder } from "../shared/protocols/PtlSearchOrder";

export async function ApiSearchOrder(call: ApiCall<ReqSearchOrder, ResSearchOrder>) {
    // TODO
    let res:any
    if(call.req.userId){
        res = await DbMgr.searchOrder(call.req)
    }else if(call.req.timeLimit){
        res = await DbMgr.searchOrderByTime(call.req)
    }
    if(res){
        call.succ({
            'code':1,
            'orders':res
        })
    }else{
        console.log("无信息")
    }

}