// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GoodsWindow from "../../resources/windows/scripts/GoodsWindow";
import { PAGETYPE } from "../Enums";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BackView extends cc.Component {

    @property(cc.Node)
    goodsBtn:cc.Node = null

    @property(cc.Node)
    orderBtn:cc.Node = null

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.orderBtn.on(cc.Node.EventType.TOUCH_END,this.openOrderView ,this)
        this.goodsBtn.on(cc.Node.EventType.TOUCH_END,this.openGoodsView,this)


    }

    start () {

    }

    openGoodsView(){
        cc.resources.load('windows/goodsWindow',cc.Prefab,(err,res:cc.Prefab)=>{
            if(err){
                console.log(err)
            }
            let window  = cc.instantiate(res)
            window.getComponent(GoodsWindow).setData({
                "winType":PAGETYPE.BUSINESS_WIN
            })
            this.node.addChild(window)
        } )
    }
    openOrderView(){
        cc.resources.load('windows',cc.Prefab,(err,res:cc.Prefab)=>{
            if(err){
                console.log(err)
            }
            let window  = cc.instantiate(res)
            this.node.addChild(window)
        } )
    }
    // update (dt) {}
}
