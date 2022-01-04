export class BaseData extends cc.Node{
  private _changeProperty: string[] = [];
  private _changePropertyParam: Object = {};

  protected changeProperty(property: string, ...args): void {
    // console.log(args)
    this._changeProperty.push(property);
    this._changePropertyParam[property] = args;
    // console.log(this._changeProperty)
    // console.log(this._changePropertyParam[property])
    this.emit(property,...args)
  }

  protected register() {
    
  }


}