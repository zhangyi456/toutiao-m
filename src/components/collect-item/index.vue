<template>
  <van-icon
    :name="value ? 'star' : 'star-o'"
    :class="{
      collected: value
    }"
    :loading="loading"
    @click="onCollect"
  ></van-icon>
</template>

<script>
import { addCollect, deleteCollect } from '@/api/user'
export default {
  name: 'ArticleCollect',
  components: {},
  props: {
    value: {
      type: Boolean,
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
  created() {
    console.log(this.value)
  },
  mounted() {},
  methods: {
    async onCollect() {
      this.loading = true
      try {
        if (this.value) {
          await deleteCollect(this.articleId)
          this.$toast.success('取消收藏')
        } else {
          await addCollect(this.articleId)
          this.$toast.success('已经收藏')
        }
        // this.value = !this.value
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (err) {
        this.$toast('操作失败，请稍后再试')
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.collected {
  color: orange;
}
</style>
