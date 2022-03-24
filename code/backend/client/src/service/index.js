
import request from '../utils/request';

export const login = (data) => {
    return request({
        type: 'post',
        url: '/login',
        data,
    })
}