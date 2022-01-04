// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import UpdateAble from "./UpdateAble";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UpdateMgr extends cc.Component {

    public localTime:number
    private _updates:Array<UpdateAble> = []
    private _timeCount:number = 0
    private _secondCount:number = 0

    constructor() {
        super()
        this.localTime = Date.now()
    }

    public addUpdate(delta: number): void{
        this._timeCount = Date.now() - this.localTime

        this.localTime += this._timeCount
        this._secondCount += this._timeCount

        this._updates.forEach(updateAble => {
            updateAble.frameUpdate(this._timeCount)
        })
        if (this._secondCount - 1000 > 0) {
            this._updates.forEach(updaterAble => {
                updaterAble.secondUpdate();
            })
            this._secondCount -= 1000
        }
    }

    public regist(updateAble: UpdateAble): void{
        if (this._updates.indexOf(updateAble) == -1) {
            this._updates.push(updateAble)
        } else {
            console.warn("重复注册",updateAble)
        }
    }

    public unRegist(updateAble: UpdateAble): void{
        if (this._updates.indexOf(updateAble) >= 0) {
            this._updates.splice(this._updates.indexOf(updateAble), 1);
        } else {
            console.warn("未注册",updateAble)
        }
    }


}
