// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


import { USERTYPR } from "../../src/shared/protocols/PtlLogin";
import DataMgr from "../DataMgr";
import NetMgr from "../NetMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class loginView extends cc.Component {

    @property(cc.Node)
    login:cc.Node = null

    @property(cc.EditBox)
    userName:cc.EditBox = null

    @property(cc.EditBox)
    pwd:cc.EditBox = null

    onLoad () {
        this.login.on(cc.Node.EventType.TOUCH_END,this.sendMsg,this)
    }

    start () {

    }
    async sendMsg(){
        let name = this.userName.string
        let pwd = this.pwd.string

        let ret = await NetMgr.client.callApi('Login', {
            username: name,
            pwd: pwd
        });

        // Error
        if (!ret.isSucc) {
            alert(ret.err.message);
            return;
        }
        
        // Success
        console.log(ret)

        DataMgr.userId = ret.res.useId
        DataMgr.money = ret.res.money
        if(ret.res.type == USERTYPR.BUSINESS){
            cc.director.loadScene("backView")
        }else{
            cc.director.loadScene("frontView")

        }
    }
    // update (dt) {}
}
