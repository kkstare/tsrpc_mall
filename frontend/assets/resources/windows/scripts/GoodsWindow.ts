// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import NetMgr from "../../../scripts/NetMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    addBtn:cc.Node
    @property(cc.Node)
    closeBtn:cc.Node
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.addBtn.on(cc.Node.EventType.TOUCH_END,this.openAddView,this)
        this.closeBtn.on(cc.Node.EventType.TOUCH_END,this.close,this)
        this.getData()
    }
    openAddView(){
        cc.resources.load('windows/addGoodWindow',cc.Prefab,(err,res:cc.Prefab)=>{
            if(err){
                console.log(err)
            }
            let window  = cc.instantiate(res)
            this.node.addChild(window)
        } )

    }
    async getData(){
        let data = await NetMgr.client.callApi('GetGoods',{})
        console.log(data)
    }
    close(){
        this.node.destroy()
    }
    start () {

    }

    // update (dt) {}
}
