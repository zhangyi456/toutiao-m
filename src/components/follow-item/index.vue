<template>
  <van-button
    v-if="articles.is_followed"
    class="follow-btn"
    round
    size="small"
    @click="onFollow"
    >已关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollow"
    >关注</van-button
  >
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'ArticleFollow',
  components: {},
  props: {
    articles: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 关注用户的方法
    async onFollow() {
      try {
        if (this.articles.is_followed) {
          await deleteFollow(this.articles.aut_id)

          // this.articles.is_followed = true
        } else {
          console.log(222)
          console.log(this.articles.aut_id)
          await addFollow(this.articles.aut_id)
          // this.articles.is_followed = false
        }
        this.articles.is_followed = !this.articles.is_followed
      } catch (err) {
        let message = '操作失败，请稍后再试'
        if (err.response && err.response.status === 400) {
          message = '用户不能关注自己'
        }
        this.$toast(message)
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
