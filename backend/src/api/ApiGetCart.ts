import { ApiCall } from "tsrpc";
import { DbMgr } from "../Db";
import { ReqGetCart, ResGetCart } from "../shared/protocols/PtlGetCart";

export async function ApiGetCart(call: ApiCall<ReqGetCart, ResGetCart>) {
    // TODO
    let res = await DbMgr.getCart(call.req)
    if(res){
        console.log("*********************")
        console.log(res)
        call.succ({
            'code':0,
            'cart':res.cart,
        })

    }

}