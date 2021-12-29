import { ApiCall } from "tsrpc";
import { DbMgr } from "../Db";
import { ReqEditGood, ResEditGood } from "../shared/protocols/PtlEditGood";

export async function ApiEditGood(call: ApiCall<ReqEditGood, ResEditGood>) {
    // TODO
    let res = await  DbMgr.editGood(call.req)
    if(res){
        call.succ({
            'code': 1,
            'msg':"添加商品成功",
        }) 
    }else{

    }
}