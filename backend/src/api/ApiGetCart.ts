import { ApiCall } from "tsrpc";
import { DbMgr } from "../Db";
import { DbGood } from "../shared/dbType/DbGood";
import Good from "../logic/good/Good";
import GoodMgr from "../logic/good/GoodMgr";
import { cardProductType, cardProductType as cartProductType, ReqGetCart, ResGetCart } from "../shared/protocols/PtlGetCart";

export async function ApiGetCart(call: ApiCall<ReqGetCart, ResGetCart>) {
    // TODO
    let cartData = await DbMgr.getCart(call.req)
    let res:cartProductType[] = []

    for (let index = 0; index < cartData.cart.length; index++) {
        // const element = array[index];
        let good:cardProductType = GoodMgr.ins.getGoodByObjectId(cartData.cart[index].goodId)
        good.goodNum = cartData.cart[index].goodNum
        res.push(good)
    }

    if(res){
        call.succ({
            'code':0,
            'cart':res,
        })
    }else{
        call.error("获取购物车失败")
    }

}