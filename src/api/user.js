import fetch from '@/config/fetch'

/**
 * 获取用户列表
 */

export const getUserList = data => fetch('/v1/users/list', data);
