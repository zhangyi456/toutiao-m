<template>
  <div class="search-history">
    <van-cell title="历史记录">
      <div v-if="isHistoriesShow">
        <span @click="$emit('deleteall')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isHistoriesShow = false">完成</span>
      </div>
      <van-icon v-else name="delete-o" @click="isHistoriesShow = true" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="index"
      @click="deleteHistories(item, index)"
    >
      <van-icon name="close" v-if="isHistoriesShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isHistoriesShow: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    deleteHistories(item, index) {
      if (this.isHistoriesShow) {
        //  删除历史记录
        this.searchHistories.splice(index, 1)
      } else {
        //  点击选项进入文章列表
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
