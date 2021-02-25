<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form @submit="onSubmit"  ref="sendSmsRules">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <!-- 这里的time表示的就是  需要倒计时的时间 这里的format表示的是单位-->
          <van-count-down v-if="isCountDownShow" :time="1000*60" format="ss s" @finish='isCountDownShow=false'/>
          <van-button
          v-else
            class="send-sms-btn"
            round
            size="small"
            type="default"
            native-type="button"
            @click="toSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          {
            pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
            message: '请输入正确手机号'
          }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '请输入正确验证码' }
        ]
      },
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 这里是的提交登录表单的方法
    async onSubmit () {
      // 获取表单数据
      const user = this.user
      // 坐表单验证
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      // 提交表单请求登录
      try {
        const { data } = await login(user)
        // console.log(user)
        // console.log(res.data)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或者验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后再试')
        }
      }
      // 根据请求结果做后续操作
    },
    // 点击发送验证码的方法
    async toSendSms () {
      // 校验手机号
      try {
        // 这里不能用this.user.mobile 因为是文档规定支持传入验证规则是 name属性的mobile
        await this.$refs.sendSmsRules.validate('mobile')
      } catch (err) {
        return console.log(err, 21)
      }
      // 发送倒计时
      this.isCountDownShow = true
      // 请求接口发送验证码
      try {
        await sendSms(this.user.mobile)
      } catch (err) {
        this.isCountDownShow = false
        if (err.status.response === 429) {
          this.$toast.fail('发送频繁，请在一分钟以后再试')
        } else {
          this.$toast.fail('发送失败，请稍后再试')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .iconfont {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
