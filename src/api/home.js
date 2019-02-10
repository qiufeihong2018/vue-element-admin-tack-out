import fetch from '@/config/fetch'


/**
 * 某天订单数量
 */

export const orderCount = date => fetch('/statis/order/' + date + '/count');

/**
 * 某天管理员注册量
 */

export const adminDayCount = date => fetch('/statis/admin/' + date + '/count');

/**
 * 获取订单数量
 */

export const getOrderCount = data => fetch('/bos/orders/count', data);

/**
 * 获取管理员数量
 */

export const adminCount = () => fetch('/admin/count');
