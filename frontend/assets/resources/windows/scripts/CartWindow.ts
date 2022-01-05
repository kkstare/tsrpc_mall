// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataMgr from "../../../scripts/DataMgr";
import BaseApp from "../../../scripts/frame/BaseApp";
import NetMgr from "../../../scripts/NetMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    butBtn:cc.Node
    @property(cc.Node)
    closeBtn:cc.Node

    // LIFE-CYCLE CALLBACKS:

    data
    onLoad () {
        this.butBtn.on(cc.Node.EventType.TOUCH_END,this.buy,this)
        this.closeBtn.on(cc.Node.EventType.TOUCH_END,this.close,this)
        this.initData()
    }
    async initData(){
        this.data = await NetMgr.client.callApi('GetCart',{
            'userId':DataMgr.userId
        })

        console.log(this.data)
    }
    async buy(){
        console.log(this.data.res.cart)
        let buyData = []
        for (let index = 0; index < this.data.res.cart.length; index++) {
           let obj = {
               goodId:this.data.res.cart[index]._id,
               goodNum:this.data.res.cart[index].goodNum
           }
           buyData.push(obj)
        }

        let data = await NetMgr.client.callApi('BuyGoods',{
            'userId':DataMgr.userId,
            'cart':buyData
        })

        console.log(data)
        if(data.isSucc){
            DataMgr.money = data.res.curMoney
        }else{
            BaseApp.ins.noticeMgr.addMsg(data.err.message)
        }
    }
    close(){
        this.node.destroy()

    }
    start () {

    }

    // update (dt) {}
}
