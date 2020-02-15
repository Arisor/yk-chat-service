const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const router = require("./routes");

const app = new Koa();
app.use(cors());
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => {
    console.log("服务器已启动,端口3000");
});