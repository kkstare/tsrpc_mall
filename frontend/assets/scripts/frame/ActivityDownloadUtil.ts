// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseApp from "../frame/BaseApp";

const {ccclass, property} = cc._decorator;

class downType{
  isFinish: boolean;
  finish: number;
  total: number
  constructor() {
    this.isFinish = false
    this.finish = 0;
    this.total = 0;
  }

}

@ccclass
export default class ActivityDownloadUtil extends cc.Component {
  static downloads:downType[] = []

  
  static checkAct(name) {
    if (ActivityDownloadUtil.downloads[name]) {
      if (ActivityDownloadUtil.downloads[name].isFinish) {
        //还需要做版本判断
        console.log("当前是最新版本")
        return true
      } else {
        console.log("活动正在下载 当前进度", ActivityDownloadUtil.downloads[name].finish + "/" + ActivityDownloadUtil.downloads[name].total)
        BaseApp.ins.noticeMgr.addMsg("活动正在下载 当前进度"+ActivityDownloadUtil.downloads[name].finish + "/" + ActivityDownloadUtil.downloads[name].total)
        return false
      }
    }
  }

  static downloadBundle(name) {
      if (ActivityDownloadUtil.downloads[name]) {
        if (ActivityDownloadUtil.downloads[name].isFinish) {
          console.log("当前是最新版本")
          return true
        } else {
          console.log("活动正在下载 当前进度", ActivityDownloadUtil.downloads[name].finish + "/" + ActivityDownloadUtil.downloads[name].total)
          return false
        }
      }
    
      BaseApp.ins.noticeMgr.addMsg("开始加载活动"+name)

      cc.assetManager.loadBundle('http://106.53.94.70/assets/'+name, (err, bundle) => {
        console.log(bundle)
        ActivityDownloadUtil.downloads[name] = new downType();
        console.log(name+"下载config成功")
        bundle.preloadDir("./", (finish, total, item) => {
          console.log(finish, total)
          ActivityDownloadUtil.downloads[name].finish = finish
          ActivityDownloadUtil.downloads[name].total = total 
        }, (err, asset) => {
            if (err) {
                console.log(err) 
            }
          console.log(name + "加载所有资源完成")
          ActivityDownloadUtil.downloads[name].isFinish = true
          return true
        })
      });
    }




}
