<template>
  <div class="my-container">
     <div class="header not-login">
        <div class="login-button" @click="$router.push('/login')">
          <img class="mobile-img" src="~@/assets/mobile.png" alt="">
          <span class="text">登录 / 注册</span>
        </div>
     </div>
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
.my-container{
  .not-login{
    background: url(~@/assets/banner.png);
    background-size: cover;
  }
  .login-button{
    flex-direction: column;
     height: 361px;
    display: flex;
    justify-content: center;
    align-items: center;
    .mobile-img{
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
</style>
