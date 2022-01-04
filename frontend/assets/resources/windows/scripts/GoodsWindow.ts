// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { PAGETYPE } from "../../../scripts/Enums";
import BaseApp from "../../../scripts/frame/BaseApp";
import NetMgr from "../../../scripts/NetMgr";
import GoodItem from "../../prefabs/scripts/GoodItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GoodsWindow extends cc.Component {

    @property(cc.Node)
    addBtn:cc.Node
    @property(cc.Node)
    closeBtn:cc.Node
    @property(cc.Node)
    content:cc.Node

    @property(cc.Prefab)
    preGoodItem:cc.Prefab

    private _data;
    private _winType:PAGETYPE

    public get data() {
        return this._data;
    }
    public set data(value) {
        this._data = value;
        this.updateRender()
    }
    onLoad () {
  
        this.getData()
    }

    setData(data){
        if(data.winType == 1 ){
            this._winType = PAGETYPE.CUSTOMER_WIN
        }else{
            this._winType = PAGETYPE.BUSINESS_WIN
        }


        this.closeBtn.on(cc.Node.EventType.TOUCH_END,this.close,this)
 
        if(this._winType == PAGETYPE.BUSINESS_WIN){
            this.addBtn.on(cc.Node.EventType.TOUCH_END,this.openAddView,this)
        }else{
            this.addBtn.active = false
        }

    }

    openAddView(){
        cc.resources.load('windows/addGoodWindow',cc.Prefab,(err,res:cc.Prefab)=>{
            if(err){
                console.log(err)
            }
            let window  = cc.instantiate(res)
            BaseApp.getInstance().layerMgr.addToBaseLayer(window)
        } )

    }
    async getData(){
        let data = await NetMgr.client.callApi('GetGoods',{})
        console.log(data)
        this.data = data.res.data
    }
    updateRender(){
        for (let index = 0; index < this._data.length; index++) {
            let node = cc.instantiate(this.preGoodItem)
            node.getComponent(GoodItem).setData(this._data[index],this._winType)
            this.content.addChild(node)
        }

    }
    close(){
        this.node.destroy()
    }
    start () {

    }

    // update (dt) {}
}
