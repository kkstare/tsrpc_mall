// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import NetMgr from "../../../scripts/NetMgr";

const {ccclass, property} = cc._decorator;

enum WINDOWTYPE{
    ADD_WIN,
    EDIT_WIN
}

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
    private data;
    private windowType:WINDOWTYPE = WINDOWTYPE.ADD_WIN


    onLoad () {
        this.addBtn.on(cc.Node.EventType.TOUCH_END,this.addGood,this)
        this.closeBtn.on(cc.Node.EventType.TOUCH_END,this.close,this)
    }

    setData(data){
        this.data = data
        this.windowType = WINDOWTYPE.EDIT_WIN
        this.goodName.string = this.data.name
        this.des.string = this.data.des
        this.price.string = this.data.price+""
        this.num.string = this.data.restNum+""

        this.addBtn.getComponentInChildren(cc.Label).string = "修改"
    }
    
    async addGood(){
        let ret
        if(this.windowType == WINDOWTYPE.ADD_WIN){
            //略过前端验证 默认输入合法
            ret = await NetMgr.client.callApi('AddGood', {
                'Name':this.goodName.string,
                'Des':this.des.string,
                'price':Number(this.price.string),
                'restNum':Number(this.num.string)
            });
        }else{
            ret = await NetMgr.client.callApi('EditGood', {
                '_id':this.data._id,
                'Name':this.goodName.string,
                'Des':this.des.string,
                'price':Number(this.price.string),
                'restNum':Number(this.num.string)
            });  
        }

  
        
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
