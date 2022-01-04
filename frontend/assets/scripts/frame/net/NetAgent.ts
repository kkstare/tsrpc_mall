import AssetUtil from "../AssetUtil";
import BaseApp from "../BaseApp";




export default class NetAgent {
  private static _instance:NetAgent = null;
  public static get instance() {
    if (NetAgent._instance == null) {
      NetAgent._instance = new NetAgent()
    }
    return NetAgent._instance
  }


  registerProto() {
  

  }
}

