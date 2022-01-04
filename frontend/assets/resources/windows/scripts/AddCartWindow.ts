// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataMgr from "../../../scripts/DataMgr";
import BaseApp from "../../../scripts/frame/BaseApp";
import NetMgr from "../../../scripts/NetMgr";
import PageCom from "../../prefabs/scripts/PageCom";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AddCartWindow extends cc.Component {

    @property(cc.Label)
    goodName:cc.Label
    @property(cc.Label)
    des:cc.Label   
    @property(cc.Label)
    price:cc.Label
    @property(cc.Label)
    num:cc.Label

    @property(cc.Label)
    allPrice:cc.Label
    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    closeBtn:cc.Node
    @property(cc.Node)
    addBtn:cc.Node

    @property(PageCom)
    pageCom:PageCom

    private chooseNum
    private data
    onLoad () {
        this.addBtn.on(cc.Node.EventType.TOUCH_END,this.addCartClick,this)
        this.closeBtn.on(cc.Node.EventType.TOUCH_END,this.close,this)

        cc.game.on(PageCom.PAGE_CHANGE,this.upNum,this)
    }

    setData(data){
        this.data = data
        // this.windowType = WINDOWTYPE.EDIT_WIN
        this.goodName.string = this.data.name
        this.des.string = this.data.des
        this.price.string = this.data.price+""
        this.num.string = this.data.restNum+""
    }   
    upNum(num){
        console.log(num)
        this.chooseNum = num
        this.allPrice.string = num*this.data.price +""

    }
    async addCartClick(){    
        this.close()
        console.log("1111111")

        await NetMgr.client.callApi('AddCart', {
            'userId':DataMgr.userId,
            'goodId':this.data._id,
            'goodNum':this.chooseNum
        }).then((res)=>{
            if(res && res.isSucc){
                BaseApp.getInstance().noticeMgr.addMsg("加入购物车成功")
            }else{
                BaseApp.getInstance().noticeMgr.addMsg(res.err.message)
            }

        })


    }

    close(){
        this.node.destroy()
    }


    start () {

    }

    // update (dt) {}
}
