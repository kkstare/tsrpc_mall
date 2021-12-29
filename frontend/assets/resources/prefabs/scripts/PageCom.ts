// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class PageCom extends cc.Component {

    @property(cc.Node)
    leftBtn:cc.Node
    @property(cc.Node)
    rightBtn:cc.Node

    @property(cc.EditBox)
    editNum:cc.EditBox 


    // LIFE-CYCLE CALLBACKS:
    private _chooseNum: number;
    public get chooseNum(): number {
        return this._chooseNum;
    }
    public set chooseNum(value: number) {
        this._chooseNum = value;
        this.updateRender()

    }


    onLoad () {
        this.leftBtn.on(cc.Node.EventType.TOUCH_END,this.leftClick,this)
        this.rightBtn.on(cc.Node.EventType.TOUCH_END,this.rightClick,this)

        this.chooseNum = 1

    }

    leftClick(){
        if(this.chooseNum<=1){
            this.chooseNum = 1
            return
        }
        this.chooseNum-=1
    }
    rightClick(){
        this.chooseNum+=1
    }

    updateNum(){
        // console.log(this.editNum.string)
        // console.log(~~this.editNum.string)
        console.log(~~this.editNum.string )

        this.chooseNum = ~~this.editNum.string
        
        if(this.chooseNum<=1){
            this.chooseNum = 1
            return
        }
    }

    updateRender(){
        this.editNum.string = this.chooseNum+""
    }


    start () {

    }

    // update (dt) {}
}
