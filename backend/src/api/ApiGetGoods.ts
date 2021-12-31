import { ApiCall } from "tsrpc";
import { DbMgr } from "../Db";
import { ReqGetGoods, ResGetGoods } from "../shared/protocols/PtlGetGoods";

export async function ApiGetGoods(call: ApiCall<ReqGetGoods, ResGetGoods>) {
    // TODO
    let res = await DbMgr.getGoods()
    call.succ({
        'code':1,
        'msg':"获取商品成功",
        'data':res
    })

}