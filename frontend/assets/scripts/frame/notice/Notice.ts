// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NoticeData } from "./NoticeMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Notice extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;



    init(notice: NoticeData) {
        // console.log(notice)
        switch (notice.type) {
            case 1:
                this.initText(notice)
                break;
            default:
                console.error("暂未实现")
        }
        
    }
    initText(notice:NoticeData) {
        this.node.position = cc.v3(0, 0, 0)
        this.node.opacity = 255
        this.label.string = notice.index
        cc.tween(this.node)
            .by(1, { y: 200, opacity: -150 })
            .delay(0.5)
            .call(this.recover.bind(this))
            .start()   
    }


    recover() {
        this.node.destroy()
    }

    start () {

    }

    // update (dt) {}
}
