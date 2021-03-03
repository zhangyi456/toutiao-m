<template>
  <div class="search-contanier">
    <!-- 搜索栏 -->
    <form class="search-form" action="/">
      <van-search
        v-model="searchText"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- /搜索栏 -->
    <!-- 搜索的记录 -->
    <search-result v-if="isResultShow" :searchText="searchText" />
    <!-- 搜索的记录 -->
    <!-- 搜索建议 -->
    <search-suggestion
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"
    />
    <!-- 搜索建议 -->
    <!-- 搜索历史纪录 -->
    <search-history v-else :searchHistories="searchHistories" @search="onSearch" @deleteall="searchHistories=[]"/>
    <!-- /搜索历史纪录 -->
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  props: {},
  data() {
    return {
      searchText: '',
      isResultShow: false,
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || []
    }
  },
  computed: {},
  watch: {
    searchHistories (value) {
      setItem('TOUTIAO_SEARCH_HISTORIES', value)
    }
  },
  created() {},
  mounted() {},
  methods: {
    onSearch(val) {
      // 更新文本框的内容
      this.searchText = val
      // 存储搜索的历史记录
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      // 渲染搜索结果
      this.searchHistories.unshift(val)

      this.isResultShow = true
    },
    onCancel() {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
.search-contanier {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
