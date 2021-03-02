<template>
  <div class="searchSuggestion">
    <van-cell icon="search" v-for="(text, index) in Suggestions" :key="index">
      <div slot="title" v-html="higtLight(text)" @click="$emit('search', text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      Suggestions: []
    }
  },
  computed: {},
  watch: {
    searchText: {
      // 这里是侦听器，其中searchText发生变化的时候就会调用handler函数
      // 这里的handler是固定语法
      handler: debounce(function(value) {
        this.loadSearchSuggestions(value)
      }, 1000),
      //   这里的imediate是其中的属性，能直接执行，在第一次就可以看到输出的内容
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    async loadSearchSuggestions(q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.Suggestions = data.data.options
      } catch (err) {
        this.$toast('获取联想建议失败，请稍后再试', err)
      }
    },
    // 这里是让搜索的文字高亮的方法
    higtLight(text) {
      const higtLightStr = `<span class="active">${this.searchText}</span>`
      // 正则表达式中间的内容不能直接是数据变量，如果写了会直接当作字符串来使用
      // 如果需要数据变量来动态的闯将数据变量则需要 new RegExp ,new RegExp是正则表达式的构造函数
      // 参数1：匹配模式字符串，它会根据这个对象来创建字符串
      // 参数2：匹配模式要写道字符串中 g代表的全局，i是不区分大小写
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, higtLightStr)
    }
  }
}
</script>

<style scoped lang="less">
.searchSuggestion{
  /deep/.active{
    color:crimson
  }
}
</style>
