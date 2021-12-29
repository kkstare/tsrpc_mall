import { ObjectID } from "bson";
import {Db, ModifyResult, MongoClient}  from "mongodb"
import { resolve } from "path/posix";
import { ReqAddCart } from "./shared/protocols/PtlAddCart";
import { ReqAddGood } from "./shared/protocols/PtlAddGood";
import { ReqBuyGoods } from "./shared/protocols/PtlBuyGoods";
import { ReqEditGood } from "./shared/protocols/PtlEditGood";
import { ReqGetCart } from "./shared/protocols/PtlGetCart";

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
            cart:[],
            orders:[],
            money:0,
        }
        let op = await DbMgr.db.collection('users').insertOne(newObj);

        if(op){
            return newObj
        } else {
            return null
        }
    }

    static async addMoney(userId: ObjectID, addMoney: number) {
        //取最后一个值 居然排序了 应该有更优解
        let userInfo = await DbMgr.db.collection('users').findOne({_id:userId})
        if(!userInfo){
            return
        }
        let op= await DbMgr.db.collection('users').findOneAndUpdate({_id:userId},{
            $set:{
                money:addMoney+userInfo.money
            }
        })
        return op
    }


    static async addCart(data:ReqAddCart) {
        let userData = await DbMgr.db.collection('users').findOne({_id:data.userId})
        if(!userData){
            return null
        }
        let op = await DbMgr.db.collection('users').updateOne({_id:data.userId},{
            $addToSet:{
                cart:{
                    "goodId":data.goodId,
                    "goodNum":data.goodNum
                }
            }
        })
        console.log(op)
        return op
    }

    static async getCart(data:ReqGetCart) {
        let op = await DbMgr.db.collection('users').findOne({_id:data.userId})

        console.log(op)
        return op
    }

    static async buyGoods(data:ReqBuyGoods) {
        // let op = await DbMgr.db.collection('users').findOne({_id:data.userId})
        let userData = await DbMgr.db.collection('users').findOne({_id:data.userId})
        if(!userData){
            return
        }
        let money = 0
        for (let index = 0; index < data.cart.length; index++) {
            let good = await DbMgr.db.collection('goods').findOne({_id:data.cart[index].goodId})
            let allPrice = good!.price * data.cart[index].goodNum
            money+=allPrice
        }

        if(userData.money < money){
            console.log("用户只有",userData.money,"共需",money)
            return null
        }

        let op = await DbMgr.db.collection('users').findOneAndUpdate({_id:data.userId},{
            $set:{
                money: userData.money - money
            }
        })

        return op
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

    static async editGood(goodInfo:ReqEditGood) {
        let op = await DbMgr.db.collection('goods').findOneAndUpdate({
            _id:goodInfo._id 
        },{
            $set:{
                name:goodInfo.Name,
                des:goodInfo.Des,
                price:goodInfo.price,
                restNum:goodInfo.restNum
            }
        });

        console.log(op)
        if(op){
            return goodInfo
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