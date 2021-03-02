<template>
  <div class="searchResult">
    <van-list
    class="searchResultList"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(article, index) in list" :key="index" :title="article.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        // 1.获取数据
        const { data } = await getSearchResults({
          page: this.page, // 页码值
          per_page: this.per_page, // 当前展示数据条数
          q: this.searchText // 关键字
        })
        // 2.渲染数据
        const { results } = data.data
        this.list.push(...results)
        // 3.结束loading状态
        this.loading = false
        // 4。判断是否还有数据
        if (results.length) {
          // 如果有这更新页码值
          this.page++
        } else {
          // 如果没有则改变finished的状态
          this.finished = true
        }
      } catch (err) {
        this.$toast('获取搜索结果失败，请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.searchResult{
  .searchResultList{
    height: 79vh;
    overflow-y: auto;
  }
}
</style>
