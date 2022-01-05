import * as path from "path";
import { HttpServer } from "tsrpc";
import { DbMgr } from "./Db";
import GoodMgr from "./logic/good/GoodMgr";
import { serviceProto } from "./shared/protocols/serviceProto";

// Create the Server
const server = new HttpServer(serviceProto, {
    port: 3000,
    // Remove this to use binary mode (remove from the client too)
    json: true
});

// Initialize before server start
async function init() {
    // Auto implement APIs
    await server.autoImplementApi(path.resolve(__dirname, 'api'));
    await  DbMgr.initDb()
    await GoodMgr.ins.initGoods()
    // DbMgr.addUser("admin","admin")
    // TODO
    // Prepare something... (e.g. connect the db)
};

// Entry function
async function main() {
    await init();
    await server.start();
};
main();