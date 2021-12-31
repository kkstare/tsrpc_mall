// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GoodsWindow from "../../resources/windows/scripts/GoodsWindow";
import DataMgr from "../DataMgr";
import { PAGETYPE } from "../Enums";
import NetMgr from "../NetMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FrontView extends cc.Component {

    @property(cc.Node)
    cartBtn:cc.Node
    @property(cc.Node)
    orderBtn:cc.Node
    @property(cc.Node)
    mallBtn:cc.Node
    @property(cc.Node)
    addMoneyBtn:cc.Node
    @property(cc.Label)
    moneyLabel:cc.Label


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.orderBtn.on(cc.Node.EventType.TOUCH_END,this.openOrderView,this)
        this.cartBtn.on(cc.Node.EventType.TOUCH_END,this.openCartView,this)
        this.mallBtn.on(cc.Node.EventType.TOUCH_END,this.openMallView,this)
        this.addMoneyBtn.on(cc.Node.EventType.TOUCH_END,this.addMoney,this)

        this.initRender()

    }

    openMallView(){
        cc.resources.load('windows/goodsWindow',cc.Prefab,(err,res:cc.Prefab)=>{
            if(err){
                console.log(err)
            }
            let window  = cc.instantiate(res)
            window.getComponent(GoodsWindow).setData({
                "winType":PAGETYPE.CUSTOMER_WIN
            })
            this.node.addChild(window)
        } )
    }

    async openOrderView(){
        let ref = await NetMgr.client.callApi('SearchOrder',{
            // userId:DataMgr.userId
            'timeLimit':{
                'beginTime':1,
                'endTime':1
            }
        })
        console.log(ref)
    }
    openCartView(){
        cc.resources.load('windows/cartWindow',cc.Prefab,(err,res:cc.Prefab)=>{
            if(err){
                console.log(err)
            }
            let window  = cc.instantiate(res)

            this.node.addChild(window)
        } )
    }

    async addMoney(){
        let ref = await NetMgr.client.callApi('AddMoney',{
            'userId':DataMgr.userId,
            'addMoney':234
        })
    }

    initRender(){
        this.moneyLabel.string = DataMgr.money+""
    }

    start () {

    }

    // update (dt) {}
}
