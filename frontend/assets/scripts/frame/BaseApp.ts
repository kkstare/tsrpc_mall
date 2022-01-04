// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


import AppData from "./AppData";
import AssetUtil from "./AssetUtil";
import LayerMgr from "./layer/layerMgr";
import NoticeMgr from "./notice/NoticeMgr";

import TipMgr from "./tip/TipMgr";
import UpdateMgr from "./update/UpdateMgr";



const {ccclass, property} = cc._decorator;

@ccclass
class BaseApp extends cc.Component {

    @property(cc.Node)
    layer:cc.Node = null
    @property(cc.Prefab)
    notice:cc.Prefab = null
    private static _instance: BaseApp;
    public static getInstance(): BaseApp {
        if (!BaseApp._instance) {
            BaseApp._instance = new BaseApp();
        }
        return BaseApp._instance;
    }


    private static _appData: AppData = null;
    public static get appData(): AppData {
        return BaseApp._appData;
    }
    public static set appData(value: AppData) {
        BaseApp._appData = value;
    }
    

    private _root: cc.Node = null;
    public get root(): cc.Node {
        return this._root;
    }


    private _layerMgr: LayerMgr;
    public get layerMgr(): LayerMgr {
        return this._layerMgr;
    }
    
    private _tipMgr: TipMgr;
    public get tipMgr(): TipMgr {
        return this._tipMgr;
    }

    private _noticeMgr: NoticeMgr
    public get noticeMgr(): NoticeMgr {
        return this._noticeMgr;
    }

    private _updateMgr: UpdateMgr;
    public get updateMgr(): UpdateMgr {
        return this._updateMgr;
    }
  
    onLoad(): void {
        BaseApp._instance = this
        console.error("onload")
        BaseApp._appData = new AppData()
        console.log("[ App Loaded ! ]");
        this._root = this.node;
        cc.game.addPersistRootNode(this._root);
        this.initMgr();

    }
    start() {
    }
    initMgr() {
        this._layerMgr = new LayerMgr(this.layer)
        this._updateMgr = new UpdateMgr()

        
        AssetUtil.loadWindow("commonRes", "prefab/tipWindow").then((res) => {
            let node = cc.instantiate(res)
            this._tipMgr = new TipMgr(node)
        })
        AssetUtil.loadWindow("commonRes", "prefab/notice").then((res) => {
            this._noticeMgr = new NoticeMgr(res)
        })
    }

    update(dt) {
        this._updateMgr?.addUpdate(dt)
    }

}

export default BaseApp
