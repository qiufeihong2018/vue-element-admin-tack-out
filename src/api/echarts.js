import request from '@/utils/request'
//  获取用户分布信息
export function getUserCity() {
    return request({
        url: '/v1/user/city/count',
        method: 'get'
    })
}
