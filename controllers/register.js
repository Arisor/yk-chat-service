let userModel = require("../models/user_info");
let md5 = require("md5");

module.exports = async (ctx, next) => {
    console.log("注册------------");
    var user = {
        name: ctx.request.body.name,
        password: ctx.request.body.password
    };
    if (user.name === "" ) {
        ctx.body = {
            success: false,
            message: "用户名不能为空"
        };
        return
    }
    if (user.password === "") {
        ctx.body = {
            success: false,
            message: "密码不能为空"
        };
        return
    }
    if (user.name.length < 6) {
        ctx.body = {
            success: false,
            message: "用户名不能少于六位"
        };
        return
    }
    if (user.password.length < 6) {
        ctx.body = {
            success: false,
            message: "密码不能少于六位"
        };
        return
    }

    await userModel.findDataByName(user.name).then(result => {
        console.log(result);
        if (result.length) {
            ctx.body = {
                success: false,
                message: "用户名已存在"
            };
        } else {
            ctx.body = {
                success: true,
                message: "注册成功！"
            };
            console.log("注册成功");
            userModel.insertData([
                ctx.request.body.name,
                md5(ctx.request.body.password)
            ]);
        }
    });
};
