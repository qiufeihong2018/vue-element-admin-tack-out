import request from '../utils/request'

export function getUserCity() {
    return request({
        url: '/v1/user/city/count',
        method: 'get'
    })
}
