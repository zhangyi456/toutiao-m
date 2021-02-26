<template>
  <div class="my-container">
    <!-- 已登录的状态 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image
            class="avatar"
            fit="cover"
            round
            :src="userInfo.photo"
          />
          <span class="name">xingmin</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
      <!-- 宫格导航 -->
      <van-grid :column-num="2" class="grid-nav mb-9" clickable>
        <van-grid-item class="grid-item">
          <i slot="icon" class="iconfont icon-shoucang"></i>
          <span slot="text" class="text">收藏</span>
        </van-grid-item>
        <van-grid-item class="grid-item">
          <i slot="icon" class="iconfont icon-lishi"></i>
          <span slot="text" class="text">历史</span>
        </van-grid-item>
      </van-grid>
      <!-- call 单元格 -->
      <van-cell-group>
        <van-cell title="消息通知" is-link />
        <van-cell class="mb-9" title="小智同学" is-link />
        <van-cell class="lgo-out" title="退出登录" @click="setOut" />
      </van-cell-group>
    </div>
    <!-- 未登录的状态 -->
    <div v-else class="header not-login">
      <div class="login-button" @click="$router.push({
      name: 'login',
      query: {
        redirect: '/my'
      }
      })">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',

  data () {
    return {
      userInfo: ''
    }
  },
  created () {
    if (this.$store.state.user) {
      this.loadUser()
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    setOut () {
      this.$dialog.confirm({ title: '确认退出吗？' })
        .then(() => {
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    async loadUser () {
      const { data } = await getUserInfo()
      try {
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取信息失败，请稍后再试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .header {
    height: 361px;
    background: url(~@/assets/banner.png);
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-button {
      flex-direction: column;
      display: flex;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
      }
      .text {
        display: flex;
        justify-content: center;
        color: #fff;
        font-size: 28px;
        margin-top: 15px;
      }
    }
  }
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
          margin-right: 23px;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      height: 130px;
    }
    .data-stats {
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
      }
      .count {
        font-size: 36px;
      }
      .text {
        font-size: 23px;
      }
    }
    .grid-nav {
      .grid-item {
        height: 141px;
      }
      .iconfont {
        font-size: 45px;
      }
      .icon-shoucang {
        color: #eb5253;
      }
      .icon-lishi {
        color: #ff9d1d;
      }
      .text {
        font-size: 28px;
      }
    }
    .lgo-out {
      text-align: center;
      color: #d86262;
    }
    .mb-9 {
      margin-bottom: 9px;
    }
  }
}
</style>
