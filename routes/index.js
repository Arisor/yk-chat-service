const router = require('koa-router')(),
    verify = require('../middlewares/verify'),
    login = require('../controllers/login'),
    register = require('../controllers/register'),
    message = require('../controllers/message');
    router.prefix(`/api`)
router.post('/login', login)
    .post('/register', register)
    .post('/message', verify, message) // 获取首页列表信息
module.exports = router