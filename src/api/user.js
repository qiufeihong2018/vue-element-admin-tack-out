import fetch from '@/config/fetch'

/**
 * 某天买家注册量
 */

export const userCount = date => fetch('/statis/user/' + date + '/count');

/**
 * 获取买家数量
 */

export const getUserCount = data => fetch('/v1/users/count', data);

/**
 * 获取买家列表
 */

export const getUserList = data => fetch('/v1/users/list', data);
