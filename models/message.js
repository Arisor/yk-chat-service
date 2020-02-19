const {
    query
} = require('../utils/db');

// 通过user_id查找首页群列表
let getGroupList = function (user_id) {
    let _sql = `SELECT r.group_id ,i.group_name , i.creater_time, i.group_avator ,
    (SELECT g.message  FROM group_msg AS g  WHERE g.to_group = r.group_id  ORDER BY TIME DESC   LIMIT 1 )  AS message ,
    (SELECT g.time  FROM group_msg AS g  WHERE g.to_group = r.group_id  ORDER BY TIME DESC   LIMIT 1 )  AS time
    FROM  group_user_relation AS r  inner join group_info AS i on r.group_id = i.group_id   WHERE r.user_id = ? `
    return query(_sql, user_id)
}

// 通过user_id查找首页私聊列表
let getPrivateList = function (user_id) {
    let _sql = ` SELECT r.other_user_id, i.name, i.avator, r.time AS be_friend_time
        , (
            SELECT p.message
            FROM private__msg p
            WHERE (p.to_user = r.other_user_id
                    AND p.from_user = r.user_id)
                OR (p.from_user = r.other_user_id
                    AND p.to_user = r.user_id)
            ORDER BY p.time DESC
            LIMIT 1
        ) AS message
        , (
            SELECT p.time
            FROM private__msg p
            WHERE (p.to_user = r.other_user_id
                    AND p.from_user = r.user_id)
                OR (p.from_user = r.other_user_id
                    AND p.to_user = r.user_id)
            ORDER BY p.time DESC
            LIMIT 1
        ) AS time
            , (
            SELECT count(*)
            FROM private__msg p
            WHERE p.from_user = r.other_user_id
                    AND p.to_user = r.user_id
                                    AND p.status = 0
        ) AS count
    FROM user_user_relation r
        INNER JOIN user_info i ON r.other_user_id = i.id
    WHERE r.user_id = ?  `
    return query(_sql, user_id)
}

// 设置已读
let setIsRead = function (from_user, to_user) {
    let _sql = ` UPDATE  private__msg SET status = 1 WHERE from_user = ? AND to_user = ? ; `
    return query(_sql, [from_user, to_user])
}

// 获取未读
let getUnReadCount = function (to_user) {
    let _sql = ` SELECT count(*) as count from private__msg WHERE to_user = ? AND status = 0 `
    return query(_sql, [to_user])
}

module.exports = {
    getGroupList,
    getPrivateList,
    setIsRead,
    getUnReadCount
}