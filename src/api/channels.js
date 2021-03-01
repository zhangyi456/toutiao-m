import request from '@/utils/request.js'
//  获取全部频道的接口
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}

// 获取以登录状态下频道数据持久化的接口
export const AddAllChannels = channels => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels: [channels]
    }
  })
}
// 删除频道的持久化接口
export const deleteAllChannels = channelsId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelsId}`
  })
}
