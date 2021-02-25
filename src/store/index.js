import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '../utils/storage'

Vue.use(Vuex)
// Token 是用户登录成功之后服务端返回的一个身份令牌，在项目中的多个业务中需要使用到：访问需要授权的 API 接口校验页面的访问权限但是我们只有在第一次用户登录成功之后才能拿到 Token。所以为了能在其它模块中获取到 Token 数据，我们需要把它存储到一个公共的位置，方便随时取用。
const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    setUser (state, value) {
      state.user = value
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
