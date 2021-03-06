<template>
  <van-icon
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    :class="{
      liked: value
    }"
    :loading="loading"
    @click="onLikeCollect"
  />
</template>

<script>
import { addLike, deleteLike } from '@/api/user'
export default {
  name: 'ArticleLike',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, Object, String],
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLikeCollect() {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          await deleteLike(this.articleId)
        } else {
          await addLike(this.articleId)
          status = 1
        }
        this.$emit('input', status)
        // 更新视图
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        this.$toast('操作失败，请稍后再试')
      }
      this.loading = false
    }
  }
}
</script>
<style scoped lang="less">
.liked {
  color: crimson;
}
</style>
