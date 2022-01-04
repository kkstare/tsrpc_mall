export default class LayerMgr{
  private _baseLayer:cc.Node


  constructor(node:cc.Node) {
    console.log("layer is loaded");
    this._baseLayer = node;
  }

  public addToBaseLayer(node: cc.Node): void{
      node.parent = this._baseLayer
  }

}
