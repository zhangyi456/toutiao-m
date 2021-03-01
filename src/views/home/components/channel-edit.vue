<template>
  <div class="channel-edit">
    <!-- 我的频道标题 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
        @click="isEditShow = !isEditShow"
        >{{ isEditShow ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <!-- 我的频道内容 -->
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(value, index) in userchannel"
        :key="index"
        icon="clear"
        @click="onMyChannelClick(value, index)"
      >
        <van-icon
          slot="icon"
          name="clear"
          v-show="isEditShow && value.name !== '推荐'"
        ></van-icon>
        <div slot="text" class="text" :class="{ active: index === active }">
          {{ value.name }}
        </div>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐标题 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <!-- 频道推荐内容 -->
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(value, index) in recommendChannel"
        :key="index"
        icon="plus"
        :text="value.name"
        @click="onAddChannel(value)"
      >
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  AddAllChannels,
  deleteAllChannels
} from '@/api/channels'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  props: {
    userchannel: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: [], // 全部频道的数据
      isEditShow: false
    }
  },
  created() {
    this.loadAllChannels()
  },
  computed: {
    ...mapState(['user']),
    // 这里要做一个计算属性去排除已经在我的频道里面已有的频道。
    recommendChannel() {
      return this.allChannels.filter(channel => {
        return !this.userchannel.find(myChannel => {
          // 这里的myChannel没有this了。因为我们在这里需要比对的就就是，我的频道中是否包含了，全部频道里面中有的频道
          return myChannel.id === channel.id
        })
      })
    }
  },
  methods: {
    // 获取全部频道的方法
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('获取全部频道失败，请稍后再试')
      }
    },
    //  添加频道的方法
    async onAddChannel(channel) {
      this.userchannel.push(channel)
      // 在这里做一个数据持久化的处理
      if (this.user) {
        // 在已登录状态下把数据存储到线上
        try {
          await AddAllChannels({
            id: channel.id, // 频道ID
            seq: this.userchannel.length
          })
        } catch (err) {
          this.$toast('获取频道失败，请稍后再试')
        }
      } else {
        // 未登录状态下把数据存储到本地
        setItem('TOUTIAO_CHANNELS', this.userchannel)
      }
    },
    // 切换频道和删除频道的方法
    onMyChannelClick(channel, index) {
      if (this.isEditShow) {
        //  删除频道的方法
        if (channel.name === '推荐') {
          return
        }
        if (index <= this.activeIndex) {
          this.$emit('check-channel', this.activeIndex - 1)
        }
        this.userchannel.splice(index, 1)
        // 删除频道的方法 处理持久化
        this.deleteChannels(channel)
      } else {
        // 切换频道的方法
        this.$emit('check-channel', index)
      }
    },
    async deleteChannels(channel) {
      try {
        if (this.user) {
          await deleteAllChannels(channel.id)
        } else {
          setItem('TOUTIAO_CHANNELS', this.userchannel)
        }
      } catch (err) {
        this.$toast('删除频道失败，请稍后再试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333333;
  }
  .van-cell__title {
    height: 69px;
    line-height: 69px;
  }
  // 编辑按钮
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
    margin-bottom: 20px;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: deepskyblue;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
