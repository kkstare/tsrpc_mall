import { ApiCall } from "tsrpc";
import { DbMgr } from "../Db";
import { ReqAddGood, ResAddGood } from "../shared/protocols/PtlAddGood";

export async function ApiAddGood(call: ApiCall<ReqAddGood, ResAddGood>) {
    // TODO
    let res = await  DbMgr.addGood(call.req)
    if(res){
        call.succ({
            'code': 1,
            'msg':"添加商品成功",
        }) 
    }else{

    }

    
}