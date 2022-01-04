import {ApiReturn, ApiReturnSucc, HttpClient,HttpClientTransportOptions,WsClient} from "tsrpc-browser"
import { ResAddMoney } from "../src/shared/protocols/PtlAddMoney";
import { serviceProto,ServiceType } from "../src/shared/protocols/serviceProto";
import DataMgr from "./DataMgr";
import BaseApp from "./frame/BaseApp";




export default class NetMgr{
    private static _instance: NetMgr;
    public static get instance(): NetMgr {
        if(!NetMgr._instance){
            NetMgr._instance = new NetMgr()
        }
        return NetMgr._instance;
    }
    public static set instance(value: NetMgr) {
        NetMgr._instance = value;
    }

    private _client:HttpClient<ServiceType>
    public static get client() {
        return NetMgr.instance._client;
    }

    private _ws:WsClient<ServiceType>
    public static get ws() {
        console.log("ws")
        return NetMgr.instance._ws;
    }
    constructor(){
        
        this._client = new HttpClient(serviceProto, {
            server: 'http://127.0.0.1:3000',
            logger: null,
        });

        // this._ws = new WsClient(serviceProto,{
        //     server: 'ws://127.0.0.1:3002',
        // })
        // this._ws.connect()
        // this.listenMsg()
    }

    async sendMsg<T extends keyof ServiceType['api']>(apiName: T, req: ServiceType['api'][T]['req'], options?: HttpClientTransportOptions){

        await this._client.callApi(apiName,req).then((data)=>{
            console.log(data)
            if(!data.isSucc){
                BaseApp.getInstance().noticeMgr.addMsg("网络错误")
                return
            }

            if(data.err){
                BaseApp.getInstance().noticeMgr.addMsg(data['err']['message'])
                return
            }

            let realData:ServiceType['api'][T]['res']
            if( apiName == 'AddMoney'  ){

                // DataMgr.money = realData
            }else if(apiName == 'AddCart'){

            }else{

            }
        })
   
    }


    listenCall(){
       
    }
    listenMsg(){
        // this._ws.listenMsg('Move',(msg)=>{
        //     console.log(msg)
        // })
               
    }

}