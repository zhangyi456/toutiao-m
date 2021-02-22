import axios from 'axios'

// 封装axios请求模块
const request = axios.create({
    baseURL:'http://ttapi.research.itcast.cn/' //基础路径
}) 

export default request