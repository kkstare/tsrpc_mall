// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { PAGETYPE } from "../../../scripts/Enums";
import BaseApp from "../../../scripts/frame/BaseApp";
import AddCartWindow from "../../windows/scripts/AddCartWindow";
import AddGoodsWindow from "../../windows/scripts/AddGoodsWindow";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GoodItem extends cc.Component {

    @property(cc.Label)
    goodName:cc.Label
    @property(cc.Label)
    des:cc.Label
    @property(cc.Label)
    price:cc.Label
    @property(cc.Label)
    num:cc.Label

    @property(cc.Node)
    editBtn:cc.Node
    @property(cc.Node)
    deleteBtn:cc.Node

    // LIFE-CYCLE CALLBACKS:
    private data
    private _winType
    onLoad () {


    }

    setData(data,wintype){
        this._winType = wintype
        if(this._winType == PAGETYPE.CUSTOMER_WIN){
            this.deleteBtn.active = false
            this.editBtn.getComponent(cc.Label).string = "加入购物车"

            this.editBtn.on(cc.Node.EventType.TOUCH_END,this.addClick,this)
        }else{
            this.editBtn.on(cc.Node.EventType.TOUCH_END,this.editClick,this)
            this.deleteBtn.on(cc.Node.EventType.TOUCH_END,this.deleteClick,this)
        }

        this.data = data
        this.goodName.string = data.name
        this.des.string = data.des
        this.price.string = data.price
        this.num.string = data.restNum
    }
    addClick(){
        cc.resources.load('windows/addCartWindow',cc.Prefab,(err,res:cc.Prefab)=>{
            if(err){
                console.log(err)
            }
            let window  = cc.instantiate(res)
            window.getComponent(AddCartWindow).setData(this.data)
            // this.node.addChild(window)
            BaseApp.getInstance().layerMgr.addToBaseLayer(window)
        } )  
    }
    editClick(){
        cc.resources.load('windows/addGoodWindow',cc.Prefab,(err,res:cc.Prefab)=>{
            if(err){
                console.log(err)
            }
            let window  = cc.instantiate(res)
            window.getComponent(AddGoodsWindow).setData(this.data)
            BaseApp.getInstance().layerMgr.addToBaseLayer(window)

        } )
    }


    deleteClick(){

    }

    start () {

    }

    // update (dt) {}
}
