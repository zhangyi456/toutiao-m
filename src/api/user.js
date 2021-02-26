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
// 验证码发送模块
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
// 获取用户自己的信息
export const getUserInfo = mobile => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}
