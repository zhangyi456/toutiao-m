<template>
  <div class="layout-container">
    <router-view></router-view>
    <van-tabbar route class="layout-tabbar">
      <van-tabbar-item to='/'>
        <i slot="icon" class="iconfont icon-shouye"></i>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item to='/qa'>
        <i slot="icon" class="iconfont icon-wenda"></i>
        <span>问答</span>
      </van-tabbar-item>
      <van-tabbar-item to='/vidio'>
        <i slot="icon" class="iconfont icon-shipin"></i>
        <span>视频</span>
      </van-tabbar-item>
      <van-tabbar-item to='/my'>
        <i slot="icon" class="iconfont icon-wode"></i>
        <span>我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
    }
  },

  methods: {}
}
</script>

<style lang='less' scoped>
.layout-container{
  .layout-tabbar{
    .iconfont{
      font-size: 40px;
    }
     span.text {
      font-size: 20px;
    }
  }
}
</style>
