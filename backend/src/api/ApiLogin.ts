import { ApiCall } from "tsrpc";
import { DbMgr } from "../Db";
import { ReqLogin, ResLogin, USERTYPR } from "../shared/protocols/PtlLogin";

export async function ApiLogin(call: ApiCall<ReqLogin, ResLogin>) {
    // TODO
    let res = await  DbMgr.findUser(call.req.username,call.req.pwd)
    if (res) {
        let userType:USERTYPR = USERTYPR.CUSTOMER
        //判断用户是商家还是顾客,此处靠用户名简单判断
        if(call.req.username == "admin" || call.req.username == "" ){
            userType = USERTYPR.BUSINESS
        }
        call.succ({
            "useId":res._id,
            'code': 1,
            'msg':"登陆成功",
            'type':userType,
            'money':res.money
        }) 
    } else {
           //未找到 走注册流程
           let res = await DbMgr.findUserName(call.req.username)
           if (!res) {
               let res2 = await DbMgr.addUser(call.req.username, call.req.pwd)
               if (res2) {
                    ApiLogin(call)
               } else {
                   call.error("网络异常 请重试")     
               }
           }else{
               call.error("账号或密码错误",{exInfo:"补充说明",exInfo2:"补充说明2"})
           }
    }
}