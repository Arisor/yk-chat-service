const jwt = require("jsonwebtoken");
const secret = require("../config").secret;
const msgModel = require("../models/message");

const getListInfo = async (ctx, next) => {
	try {
		const res1 = await msgModel.getPrivateList(ctx.request.body.user_id);
		const privateList = JSON.parse(JSON.stringify(res1));
		const res2 = await msgModel.getGroupList(ctx.request.body.user_id);
		const groupList = JSON.parse(JSON.stringify(res2));
		ctx.body = {
			success: true,
			data: {
				privateList: privateList,
				groupList: groupList
			}
		};
	} catch (error) {
		console.log(error);
	}
};

const setIsRead = async (ctx, next) => {
	try {
		await msgModel.setIsRead(ctx.request.body.from_user, ctx.user_id);
		ctx.body = {
			success: true,
		};
	} catch (error) {
		ctx.body = {
			success: false,
		};
	}
};

const getUnReadCount = async (ctx, next) => {
	try {
		const res = await msgModel.getUnReadCount(ctx.user_id);
		console.log('数量:', res)
		ctx.body = {
			success: true,
			data: {
				count: res[0].count
			}
		};
	} catch (error) {
		ctx.body = {
			success: false,
		};
	}
};

module.exports = {
	getListInfo,
	setIsRead,
	getUnReadCount
};