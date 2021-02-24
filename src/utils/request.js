import axios from 'axios'

// 封装axios请求模块 这里用的封装实例的方式来发送请求，主要是为了后面创建更多的实例返送请求 ，每个请求之间是相互不影响
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'// 基础路径
})

export default request
