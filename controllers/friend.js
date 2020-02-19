const userModel = require("../models/user_info");
module.exports = async (ctx, next) => {
    if (ctx.user_id === '') {
        ctx.body = {
            success: false,
            message: '参数为空'
        };
        return;
    }
    const res = await userModel.getMyFriends(ctx.user_id);
    const friendList = JSON.parse(JSON.stringify(res))
    ctx.body = {
        success: true,
        data: {
            friendList,
        }
    };
};