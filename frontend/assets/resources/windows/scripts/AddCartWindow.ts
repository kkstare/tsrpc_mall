// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataMgr from "../../../scripts/DataMgr";
import NetMgr from "../../../scripts/NetMgr";

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
    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    closeBtn:cc.Node
    @property(cc.Node)
    addBtn:cc.Node

    private data
    onLoad () {
        this.addBtn.on(cc.Node.EventType.TOUCH_END,this.addCartClick,this)
        this.closeBtn.on(cc.Node.EventType.TOUCH_END,this.close,this)

    }

    setData(data){
        this.data = data
        // this.windowType = WINDOWTYPE.EDIT_WIN
        this.goodName.string = this.data.name
        this.des.string = this.data.des
        this.price.string = this.data.price+""
        this.num.string = this.data.restNum+""
    }   

    async addCartClick(){
          
        let ret = await NetMgr.client.callApi('AddCart', {
            'userId':DataMgr.userId,
            'goodId':this.data._id,
            'goodNum':100
            // 'Name':this.goodName.string,
            // 'Des':this.des.string,
            // 'price':~~this.price.string,
            // 'restNum':~~this.num.string
        });
    }
    close(){
        this.node.destroy()
    }


    start () {

    }

    // update (dt) {}
}
