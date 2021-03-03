import request from '@/utils/request'

// 获取文章列表的信息
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
// 获取文章详情的接口
export const getArticlesById = articleId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}
