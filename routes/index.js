const router = require('koa-router')(),
    verify = require('../middlewares/verify'),
    login = require('../controllers/login'),
    register = require('../controllers/register'),
    message = require('../controllers/message'),
    privateChat = require('../controllers/privateChat');
    friend = require('../controllers/friend'),
    userInfo = require('../controllers/userInfo.js'),
    newFriends = require('../controllers/newFriends.js');
router.prefix('/api')
    .post('/login', login)
    .post('/register', register)
    .post('/message', verify, message.getListInfo) // 获取首页列表信息
    .post('/set_is_read', verify, message.setIsRead) // 设置已读
    .post('/get_un_read_count', verify, message.getUnReadCount) // 获取未读数目
    .post('/private_detail', verify, privateChat.getprivateDetail) // 获取私聊相关内容
    .post('/private_save_msg', verify, privateChat.savePrivateMsg) //保存私聊信息
    .post('/get_my_friends', verify, friend) //获取我的好友
    .post('/find_people', verify, userInfo.findUIByName) //通过用户名搜索加人，此接口返回用户信息
    .post('/is_friend', verify, userInfo.isFriend) // 是否是好友
    .post('/get_newfriends', verify, newFriends.getnewFriends) // 获取新朋友通知
	.post('/insert_newfriends', verify, newFriends.insertNewFriends) // 添加我的新好友通知
	.post('/update_newfriends', verify, newFriends.updateNewFriends) // 更新 新好友状态  是否已被同意加好友
	.post('/is_request_friends', verify, newFriends.isRequestFriends) // 更新 新好友状态  是否已被同意加好友
    .post('/be_friend', verify, userInfo.agreeBeFriend) // 加为好友
module.exports = router