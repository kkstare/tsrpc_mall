import { ApiCall } from "tsrpc";
import { DbMgr } from "../Db";
import { ReqAddCart, ResAddCart } from "../shared/protocols/PtlAddCart";

export async function ApiAddCart(call: ApiCall<ReqAddCart, ResAddCart>) {
    // TODO
    let res = await  DbMgr.addCart(call.req)
    if(res){
        call.succ({
            'code': 1,
            'msg':"添加到购物车成功",
        }) 
    }else{

    }
}