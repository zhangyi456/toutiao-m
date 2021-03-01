<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        slot="title"
        type="info"
        icon="search"
        size="mini"
        round
        class="search-btn"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 频道列表 -->
    <van-tabs class="channel-tabs" v-model="active" swipeable animated>
      <van-tab
        :title="channels.name"
        v-for="channels in channels"
        :key="channels.is"
      >
        <!-- 这里的channal 就是我们自己定义的，需要将它传到文件列表组件中，因为我们需要点击每个按钮来渲染不同文章页面  -->
        <!-- 实现思路也非常简单，就是我们准备**多个 list 数组，每个频道对应一个，查看哪个频道就把数据往哪个频道的列表数组中存放，这样的话就不会导致覆盖问题。 -->
        <!-- 具体做法就是：封装一个文章列表组件,然后在频道列表中把文章列表遍历出来,因为文章列表组件中请求获取文章列表数据需要频道 id，所以 频道 id 应该作为 props 参数传递给文章列表组件，为了方便，我们直接把频道对象传递给文章列表组件就可以了。 -->
        <articleList :channel="channels"></articleList>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div
        slot="nav-right"
        class="hambager-btn"
        @click="isChannelEditShow = true"
      >
        <i slot="icon" class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="isChannelEditShow"
      close-icon-position="top-left"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <channel-edit
        :userchannel="channels"
        :active="active"
        @check-channel="onCheckChannel"
      />
      <!-- 这里要写双标签 -->
    </van-popup>
    <!-- /弹出层 -->
  </div>
</template>

<script>
import { getUserChannel } from '@/api/user'
import articleList from './components/article-list'
import channelEdit from './components/channel-edit'
import { getItem } from '@/utils/storage'
import { mapState } from 'vuex'
export default {
  name: 'homer',
  components: {
    articleList,
    channelEdit
  },
  data() {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false
    }
  },
  created() {
    this.loadChannel()
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async loadChannel() {
      try {
        if (this.user) {
          const { data } = await getUserChannel()
          this.channels = data.data.channels
        } else {
          this.channels = getItem('TOUTIAO_CHANNELS')
          if (this.channels) {
            return
          } else {
            const { data } = await getUserChannel()
            this.channels = data.data.channels
          }
        }
      } catch (err) {
        this.$toast('获取频道数据失败，请稍后再试')
      }
    },
    onCheckChannel(index) {
      this.active = index
      this.isChannelEditShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 100px;
  padding-bottom: 100px;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/.channel-tabs {
    padding-top: 73px;
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777777;
    }
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      z-index: 1;
      height: 82px;
    }
    .van-tab--active {
      color: #333333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      width: 31px;
      height: 6px;
      bottom: 8px;
      background-color: #3296fa;
    }
  }
  // 这里这placeholder这个样式主要是展示的就是一个空的盒子让最后一个频道能展现到汉堡按钮的外面
  .placeholder {
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }
  .hambager-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    background-color: rgba(255, 255, 255, 0.902);
    .iconfont {
      font-size: 33px;
    }
    // 这里的样式主要展示汉堡按钮旁边的那个边框的显示，在手机端展示的清楚一些
    &:before {
      content: '';
      position: absolute;
      left: 0;
      width: 1px;
      height: 100%;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
}
</style>
