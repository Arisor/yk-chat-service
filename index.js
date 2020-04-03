const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
// const cors = require("@koa/cors");
const http = require("http");
const socketModel = require("./models/soketHander");
const router = require("./routes");

const app = new Koa();
const server = http.createServer(app.callback());

// app.use(cors());
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

const io = require("socket.io")(server);
io.on("connection", socket => {
    const socketId = socket.id;
    console.log('连接上了:', socketId)
    //登录
    socket.on("login", async userId => {
        console.log('存储', socketId)
        await socketModel.saveUserSocketId(userId, socketId);
    });
    // 更新soketId
    socket.on("update", async userId => {
        console.log('更新', socketId)
        await socketModel.saveUserSocketId(userId, socketId);
    });
    //私聊
    socket.on("sendPrivateMsg", async data => {
        console.log('发送私聊')
        const arr = await socketModel.getUserSocketId(data.to_user);
        const RowDataPacket = arr[0];
        const socketid = JSON.parse(JSON.stringify(RowDataPacket)).socketid;
        console.log(socketid)
        io.to(socketid).emit("getPrivateMsg", data);
    });
    // 群聊
    socket.on("sendGroupMsg", async data => {
        io.sockets.emit("getGroupMsg", data);
    });

    //加好友请求
    socket.on("sendRequest", async data => {
        console.log("sendRequest", data);
        const arr = await socketModel.getUserSocketId(data.to_user);
        const RowDataPacket = arr[0];
        const socketid = JSON.parse(JSON.stringify(RowDataPacket)).socketid;
        console.log("给谁的socketid", socketid);
        io.to(socketid).emit("getresponse", data);
    });

    socket.on("disconnect", data => {
        console.log("disconnect", data);
    });
});

server.listen(3000, () => {
    console.log("服务器已启动,端口3000");
});