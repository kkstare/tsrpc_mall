// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import NetMgr from "../../../scripts/NetMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AddGoodsWindow extends cc.Component {

    @property(cc.EditBox)
    goodName:cc.EditBox

    @property(cc.EditBox)
    des:cc.EditBox   

    @property(cc.EditBox)
    price:cc.EditBox   

     @property(cc.EditBox)
    num:cc.EditBox

    @property(cc.Node)
    addBtn:cc.Node
    @property(cc.Node)
    closeBtn:cc.Node

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.addBtn.on(cc.Node.EventType.TOUCH_END,this.addGood,this)
        this.closeBtn.on(cc.Node.EventType.TOUCH_END,this.close,this)
    }

    async addGood(){
        //略过前端验证 默认输入合法
        let ret = await NetMgr.client.callApi('AddGood', {
           'Name':this.goodName.string,
           'Des':this.des.string,
           'price':~~this.price.string,
           'restNum':~~this.num.string
        });
        
        if (!ret.isSucc) {
            alert(ret.err.message);
            return;
        }
    }
    close(){
        this.node.destroy()
    }

    start () {

    }

    // update (dt) {}
}
