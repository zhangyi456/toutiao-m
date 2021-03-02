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
        @focus="isResultShow= false"
      />
    </form>
    <!-- /搜索栏 -->
    <!-- 搜索的记录 -->
    <search-result v-if="isResultShow" :searchText = "searchText"/>
    <!-- 搜索的记录 -->
    <!-- 搜索建议 -->
    <search-suggestion v-else-if="searchText" :searchText = "searchText" @search="onSearch"/>
    <!-- 搜索建议 -->
    <!-- 搜索历史纪录 -->
    <search-history v-else/>
    <!-- /搜索历史纪录 -->
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
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
      isResultShow: false
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {},
  methods: {
    onSearch(val) {
      this.searchText = val
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
