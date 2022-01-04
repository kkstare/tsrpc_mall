import { ObjectID } from "bson";
import {Db, ModifyResult, MongoClient, ReturnDocument}  from "mongodb"
import DbOrder from "./dbType/DbOrder";
import DbUsers from "./dbType/DbUsers";
import { ReqAddCart } from "./shared/protocols/PtlAddCart";
import { ReqAddGood } from "./shared/protocols/PtlAddGood";
import { ReqBuyGoods } from "./shared/protocols/PtlBuyGoods";
import { ReqEditGood } from "./shared/protocols/PtlEditGood";
import { ReqGetCart } from "./shared/protocols/PtlGetCart";
import { ReqSearchOrder } from "./shared/protocols/PtlSearchOrder";

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
      
        let newObj:DbUsers = new DbUsers(username,password)
        let op = await DbMgr.db.collection('users').insertOne(newObj);

        if(op){
            return newObj
        } else {
            return null
        }
    }

    static async addMoney(userId: ObjectID, addMoney: number) {
        let op= await DbMgr.db.collection('users').findOneAndUpdate({
            _id:userId
        },{
            $inc:{
                money:addMoney
            }   
        },{
            returnDocument:'after',
        })
        console.log(op)
        return op.value
    }

    static async addCart(data:ReqAddCart) {
        let op = await DbMgr.db.collection('users').updateOne({
            _id:data.userId,
            cart: {
                $elemMatch: {
                    goodId: data.goodId
                }
            }
        },{
            $inc:{
                'cart.$.goodNum': data.goodNum
            }
        })
        if(!op.modifiedCount){
            op = await DbMgr.db.collection("users").updateOne({
                _id:data.userId
            },{
                $push:{
                    cart:{
                        "goodId":data.goodId,
                        "goodNum":data.goodNum
                    }
                }
            })
        }
        console.log("******************")
        console.log(op)
    
        return op
    }


    static async getCart(data:ReqGetCart) {
        let op = await DbMgr.db.collection('users').findOne({_id:data.userId})
        // op.cart
        console.log(op)
        

        return op
    }

    static async buyGoods(data:ReqBuyGoods) {
        let userData = await DbMgr.db.collection('users').findOne({_id:data.userId})
        if(!userData){
            return
        }
        let money = 0
        let msg = "" 
        for (let index = 0; index < data.cart.length; index++) {
            //有model层后可以省略每次的查询
            let good = await DbMgr.db.collection('goods').findOne({_id:data.cart[index].goodId})
            let allPrice = good!.price * data.cart[index].goodNum
            if(good!.restNum < data.cart[index].goodNum ){
                msg += good!.name +"数量不足;"
            }
            money+=allPrice
        }

        if(msg != ""){
            console.log(msg)
            return null
        }

        if(userData.money < money){
            console.log("用户只有",userData.money,"共需",money)
            return null
        }
        let products = []

        
        for (let index = 0; index < data.cart.length; index++) {
            let good = await DbMgr.db.collection('goods').findOne({_id:data.cart[index].goodId})
            let goodObj = {
                goodId:good!._id,
                dealPrice:good!.price,
                dealNum:data.cart[index].goodNum,
                dealAllPrice:good!.price*data.cart[index].goodNum,
            }
            products.push(goodObj)
        }
        let createTime = Date.now()
        let totalPrice = money

        let op = await DbMgr.db.collection('users').findOneAndUpdate({_id:data.userId},{
            $inc:{
                money: -money
            }
        },{
            returnDocument:'after'
        })
        let orderObj = new DbOrder(products,createTime,totalPrice)
        await DbMgr.db.collection('orders').insertOne(
            orderObj
        )

        console.timeEnd("buy")

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

    static async searchOrder(data:ReqSearchOrder){
        console.log(data)
        let op = await DbMgr.db.collection('users').aggregate([  
            {
                $match:{
                    _id:data.userId
                }
            },{
                $project:{
                    orders:1
                }
            }
        ]).toArray() ;
        console.log("order**********")
        console.log(op)
        return op[0]
    }

    static async searchOrderByTime(data:ReqSearchOrder){
        let op = await DbMgr.db.collection('users').aggregate([  
            {
                $project:{
                    orders:1,
                }
            },{
                $unwind:"$orders",
            },{
                $sort:{
                    "orders.createTime":1
                }
            },{
                $match:{
                    "orders.createTime":{
                        $gt:1640939069606
                    }
                }
            }
        ]).toArray() ; 
        console.log("searchOrderByTime*(((((((((************")

        console.log(op)
        return op
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