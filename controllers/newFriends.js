const newFriendsModel = require("../models/newFriends");

/**
 *  获取我的新好友通知
 * @param user_id  我的id
 * @return
 */

let getnewFriends = async (ctx, next) => {
	const RowDataPacket = await newFriendsModel.getnewFriends(ctx.user_id),
		newFriends = JSON.parse(JSON.stringify(RowDataPacket));
	ctx.body = {
		success: true,
		data: {
			newFriends: newFriends
		}
	};
};

/**
 *  添加我的新好友通知
 * @param
 * @return
 */

let insertNewFriends = async (ctx, next) => {
	const arr = [ctx.user_id, ctx.request.body.to_user, ctx.request.body.content, ctx.request.body.time, ctx.request.body.status];
	await newFriendsModel.insertNewFriends(arr).then(result => {
		ctx.body = {
			success: true
		};
	}).catch(err => {
		console.log(err);
	});
};

/**
 *  更新我的新好友通知状态
 * @param
 * @return
 */

let updateNewFriends = async (ctx, next) => {
	await newFriendsModel.updateNewFriends(ctx.request.body.from_user, ctx.user_id).then(result => {
		console.log('updateNewFriends更新我的新好友通知状态成功')
		ctx.body = {
			success: true
		};
	}).catch(err => {
		console.log(err);
	});
};

/**
 *  
 * @param
 * @return
 */

let isRequestFriends = async (ctx, next) => {
	const res1 = await newFriendsModel.isRequestFriends(ctx.request.body.to_user, ctx.user_id)
	const res2 = await newFriendsModel.isRequestFriends(ctx.user_id, ctx.request.body.to_user)
	if (res1.length > 0 || res2.length > 0) {
		ctx.body = {
			success: true,
			data: {
				isRequesting: true
			}
		};
	} else {
		ctx.body = {
			success: true,
			data: {
				isRequesting: false
			}
		};
	}
};
module.exports = {
	getnewFriends,
	insertNewFriends,
	updateNewFriends,
	isRequestFriends
};