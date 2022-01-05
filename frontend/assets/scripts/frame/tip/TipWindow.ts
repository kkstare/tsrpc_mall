// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseApp from "../BaseApp";
import { MyDecorator } from "../decorator/MyDecorator";
import UpdateAble from "../update/UpdateAble";

const {ccclass, property} = cc._decorator;
const {logMethod,logMethod2} = MyDecorator

@ccclass
export default class TipWindow extends cc.Component implements UpdateAble {

    frameUpdate(dt: any): void {
        this.text.string = BaseApp.ins.updateMgr.localTime.toString()
    }
    secondUpdate(): void {
        console.log("秒刷新")
        this.text.string = BaseApp.ins.updateMgr.localTime.toString()
    }

    @property(cc.Node)
    btn1: cc.Node = null

    @property(cc.Node)
    btn2: cc.Node = null

    @property(cc.Label)
    text: cc.Label = null
    
    private static _instance: TipWindow = null;
    public static get instance(): TipWindow {
        return TipWindow._instance;
    }

    onLoad() {
        TipWindow._instance = this
    }
    onEnable() {
        BaseApp.ins.updateMgr.regist(this)
    }

    start () {

    }
    /**
     * 
     * @param target 调用者
     * @param tipText 提示文本
     * @param call1 确认回调
     * @param call2 取消回调
     */
    showTipWindow(target:any,tipText:string,call1:CallableFunction,call2:CallableFunction = null) {
        this.text.string = tipText

        this.btn1.on(cc.Node.EventType.TOUCH_END, call1,target)
        this.btn1.on(cc.Node.EventType.TOUCH_END, this.close,this)

        if (call2) {
            this.btn2.on(cc.Node.EventType.TOUCH_END,call2,target)
        }
        this.btn2.on(cc.Node.EventType.TOUCH_END,this.close,this)
       
    }

    close() {
        this.node.active = false
        BaseApp.ins.updateMgr.unRegist(this)

    }

    // update (dt) {}
}
