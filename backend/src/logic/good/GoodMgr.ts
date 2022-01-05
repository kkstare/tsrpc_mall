import { ObjectId } from "mongodb";
import { DbMgr } from "../../Db";
import Good from "./Good";

export default class GoodMgr{
    private static _ins: GoodMgr;
    public static get ins(): GoodMgr {
        if(!GoodMgr._ins){
            GoodMgr._ins = new GoodMgr()
        }
        return GoodMgr._ins;
    }
    public static set ins(value: GoodMgr) {
        GoodMgr._ins = value;
    }

    goods:Good[] = []

    //启动服务器时初始化
    async initGoods(){
        let data =  await DbMgr.getGoods()
        for (let index = 0; index < data.length; index++) {
            this.goods[data[index]._id.toString()] = data[index]
        }
    }

    addGood(good:Good){
        this.goods[good.dbInfo._id.toString()] = good
    }

    deleteGood(){

    }

    getGoodByObjectId(objId:ObjectId){
        return this.goods[objId.toString()]
    }

    editGood(){
        
    }



}