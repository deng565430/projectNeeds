<template>
  <transition name="swiper-detail">
    <div class="swiper-detail">
      <div class="title">
        <my-title :title="'平台消息'"></my-title>
      </div>
      <scroll ref="scroll" class="scroll">
        <div>
          <div class="detail-content" v-if="$route.query.type == 1">
            <img :src="bg" @load="loadImage" alt="">
          </div>
          <div class="detail-content" v-if="$route.query.type == 2">
            <img :src="relay1" @load="loadImage" alt="">
          </div>
          <div class="detail-content" v-if="$route.query.type == 2">
            <img :src="relay2" @load="loadImage" alt="">
          </div>
          <div class="detail-content" v-if="$route.query.type == 2">
            <img :src="relay3" @load="loadImage" alt="">
          </div>
          <div class="detail-content" v-if="$route.query.type == 2">
            <img :src="relay4" @load="loadImage" alt="">
          </div>
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import MyTitle from 'base/title/title'
import Scroll from 'base/scroll/scroll'
import { countNum } from 'api/bannerDetail'
import TYPE from 'common/js/buryingpointType'
import { addLog } from 'api/buryingpoint'
export default {
  components: {
    MyTitle,
    Scroll
  },
  data() {
    return {
      bg: require('common/image/swiper1.jpg'),
      relay1: require('common/image/relay1.jpg'),
      relay2: require('common/image/relay2.jpg'),
      relay3: require('common/image/relay3.jpg'),
      relay4: require('common/image/relay4.jpg')
    }
  },
  created() {
    const self = this
    setTimeout(function() {
      if (parseInt(self.$route.query.type) === 1) {
        addLog(TYPE.SWIPERDETAIL1, '', '', '', window.USERMSG)
      }
      if (parseInt(self.$route.query.type) === 2) {
        addLog(TYPE.SWIPERDETAIL2, '', '', '', window.USERMSG)
      }
    }, 1500)
    this._countNum()
  },
  methods: {
    loadImage() {
      if (!this.checkloaded) {
        this.checkloaded = true
      }
      this.$refs.scroll.refresh()
    },
    _countNum() {
      countNum().then(res => {})
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.swiper-detail {
  position: fixed;
  width: 100%;
  top: 0px;
  bottom: 0;
  z-index: 10000;
  background: #eee;
  font-size: $font-size-medium;

  .scroll {
    position: fixed;
    top: 50px;
    bottom: 0;
    width: 100%;
    overflow: hidden;

    .detail-content {
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
        vertical-align: text-top;
      }
    }
  }
}

.detail-enter-active, .detail-leave-active {
  transition: all 0.3s;
}

.detail-enter, .detail-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
