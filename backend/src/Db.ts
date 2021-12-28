import {Db, MongoClient}  from "mongodb"
import { ReqAddGood } from "./shared/protocols/PtlAddGood";

export class DbMgr {
    static db: Db;
    static async initDb() {
        const uri = 'mongodb://user:password@127.0.0.1:27017/study?authSource=admin';
        const client = await new MongoClient(uri).connect();
        this.db = client.db();
    }

    static async findUser(username:string,password:string){
        let op = await DbMgr.db.collection('users').findOne({
            userName: username,
            pwd:password
        });
        return op
    }

    static async findUserName(username:string){
        let op = await DbMgr.db.collection('users').findOne({
            userName: username,
        });

        let flag = false
        if(op){
            flag = true
        }
        return  flag
    }

    static async addUser(username: string, password: string) {
        //取最后一个值 居然排序了 应该有更优解
        let newObj = {
            userName: username,
            pwd: password,
        }
        let op = await DbMgr.db.collection('users').insertOne(newObj);

        if(op){
            return newObj
        } else {
            return null
        }
    }
   

    static async addGood(goodInfo:ReqAddGood) {
        let good = {
            name:goodInfo.Name,
            des:goodInfo.Des,
            price:goodInfo.price,
            restNum:goodInfo.restNum
        }

        let op = await DbMgr.db.collection('goods').insertOne(good);

        if(op){
            return good
        } else {
            return null
        }
    }
   
    static async getGoods() {
        let op = await DbMgr.db.collection('goods').find().toArray();

        if(op.length>=0){
            return op
        } else {
            return null
        }
    }
    
}