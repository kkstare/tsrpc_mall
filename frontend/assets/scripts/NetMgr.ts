import {HttpClient,WsClient} from "tsrpc-browser"
import { serviceProto,ServiceType } from "../src/shared/protocols/serviceProto";



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
            logger: console
        });
        // this._ws = new WsClient(serviceProto,{
        //     server: 'ws://127.0.0.1:3002',
        // })
        // this._ws.connect()
        // this.listenMsg()
    }

    listenMsg(){
        // this._ws.listenMsg('Move',(msg)=>{
        //     console.log(msg)
        // })
               
    }

}