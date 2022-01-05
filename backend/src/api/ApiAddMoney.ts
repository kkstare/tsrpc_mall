import { ApiCall } from "tsrpc";
import { DbMgr } from "../Db";
import { ReqAddMoney, ResAddMoney } from "../shared/protocols/PtlAddMoney";

export async function ApiAddMoney(call: ApiCall<ReqAddMoney, ResAddMoney>) {
    // TODO
    let res = await  DbMgr.addMoney(call.req.userId,call.req.addMoney)
    if(res){
        call.succ({
            'code': 1,
            'curMoney':res.money
        }) 
    }else{

    }

}