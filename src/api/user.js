// 导入请求模块
import request from '@/utils/request.js'
// 用户登录模块
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
