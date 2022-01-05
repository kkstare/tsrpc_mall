import BaseApp from "../BaseApp";
import TipWindow from "./TipWindow";

export default class TipMgr{
  private _TipWindow:cc.Node

  constructor(node:cc.Node) {
    console.log("layer is loaded");
    this._TipWindow = node;
  }

  public showTipWindow(target,tipText: string, call1: CallableFunction, call2: CallableFunction = null): void{
      this._TipWindow.active = true
      this._TipWindow.getComponent(TipWindow).showTipWindow(target,tipText,call1,call2)
      BaseApp.ins.layerMgr.addToBaseLayer(this._TipWindow)
  }

}
