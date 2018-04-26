<template>
  <div class="swiper-detail">
    <div class="title">
      <my-title :title="'平台消息'"></my-title>
    </div>
    <!-- <scroll ref="scroll" class="scroll"> -->
    <div v-html="html" id="img">
    </div>
    <!-- </scroll> -->
  </div>
</template>

<script type="text/ecmascript-6">
import { getrotation } from 'api/swiperDetail'
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
      html: ''
    }
  },
  created() {
    getrotation(this.$route.query.id).then(res => {
      this.html = res.data.data
    })
    // .then(() => {
    //   // this.$refs.scroll.refresh()
    // })
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
  updated() {},
  methods: {
    _countNum() {
      countNum().then(res => {})
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.swiper-detail {
  padding-top: 50px;
  // position: fixed;
  width: 100%;
  // top: 0px;
  // bottom: 0;
  // z-index: 10000;
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
