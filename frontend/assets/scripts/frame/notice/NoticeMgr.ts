import BaseApp from "../BaseApp";
import UpdateAble from "../update/UpdateAble";
import Notice from "./Notice";
export class NoticeData{
    type: number;
    index: string;
    number: number;
    constructor(type=1,index,number=1) {
        this.type = type
        this.index = index
        this.number = number
    }

}


export default class NoticeMgr implements UpdateAble{
    private _preNotice: cc.Prefab
    private _noticeQueue:Array<NoticeData>


    constructor(pre: cc.Prefab) {

        BaseApp.getInstance().updateMgr.regist(this)
        this._preNotice = pre;
        this._noticeQueue = []
        console.log("noticeMgr is loaded");
    }


    /**
     * 
     * @param index 文本 或者道具id
     * @param type 1：提示文本 2：获取道具提示 默认1
     * @param number 获取道具数量,可选参数
     */
    public addMsg(index:string,type?:number,number?:number) {
        let noticeData = new NoticeData(type, index, number)
        if (this._noticeQueue.length == 0) {
            this._showMsg(noticeData) 
        } else {
            this._noticeQueue.push(noticeData)   
        }
    }

    private _showMsg(notice:NoticeData) {
        let node = cc.instantiate(this._preNotice)
        node.getComponent(Notice).init(notice)
        BaseApp.getInstance().layerMgr.addToBaseLayer(node)
    }

    frameUpdate(dt: any): void {

    }
    secondUpdate(): void {
        for (let index = 0; index < this._noticeQueue.length; index++) {
            let curNotice = this._noticeQueue.shift();
            this._showMsg(curNotice)
        }
    }

}
