import { Db } from "mongodb";
import { ApiCall } from "tsrpc";
import { DbMgr } from "../Db";
import { ReqBuyGoods, ResBuyGoods } from "../shared/protocols/PtlBuyGoods";

export async function ApiBuyGoods(call: ApiCall<ReqBuyGoods, ResBuyGoods>) {
    // TODO
    // call.error('API Not Implemented');
    let res = await DbMgr.buyGoods(call.req)
    console.log(res.value)
    call.succ({
        'code':0,
        'msg':"操作成功",
        'curMoney':res.value.money
        
    })
    console.log("========================")
    console.log(res)
}