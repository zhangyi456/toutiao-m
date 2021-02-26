import axios from 'axios'
import store from '@/store'

// 封装axios请求模块 这里用的封装实例的方式来发送请求，主要是为了后面创建更多的实例返送请求 ，每个请求之间是相互不影响
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'// 基础路径
})

// 封装请求拦截器
request.interceptors.request.use(function (config) {
  // config ：本次请求的配置对象
  // config 里面有一个属性：headers
  const { user } = store.state
  // 这个判断的时候的一定要注意，先要有这个user才可以进入判断，不然会报错的
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
export default request
