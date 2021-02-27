import request from '@/utils/request'

// 获取文章列表的信息
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
