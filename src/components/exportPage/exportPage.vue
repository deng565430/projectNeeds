<template>
  <div class="show-detail">
    <div class="title" id="dom" v-if="detailList.length">
      <my-title :title="'项目介绍'"></my-title>
    </div>
    <scroll ref="scroll" class="list" :data="detailList">
      <div class="detail-list">
        <div class="detail-child" v-if="detailList.length" ref="htmlToImg">
          <div v-for="item in detailList">
            <div class="slider-wrapper" v-if="item.home_page != null ? true : false">
              <img :src="'http://sofmanager.fangsir007.com/image/' + item.home_page[0]" alt="">
            </div>
            <div class="item-title">
              <div class="item-addr">
                <h3 class="pink">{{title}} </h3>
                <span>{{item.address}}</span>
              </div>
            </div>
            <div class="item-sell" v-if="item.selling_point != null ? (item.selling_point.length > 1 ? true : false) : false">
              <div>
                <div class="pro-sell">
                  项目卖点
                </div>
                <div class="item-sell-child" v-for="sellItem in item.selling_point" v-if="sellItem.length > 3">
                  <span class="sell-l">
                    <i class="icon-star"></i>
                  </span>
                  <span class="sell-r">{{sellItem}}</span>
                </div>
              </div>
            </div>
            <div class="item-sell">
              <div v-if="item.dynamic != null">
                <div class="pro-sell">
                  最新动态
                </div>
                <div class="item-sell-child">
                  <span class="sell-l">
                    <i class="icon-star"></i>
                  </span>
                  <span class="sell-r">{{item.dynamic}}</span>
                </div>
              </div>
            </div>
            <div class="item-info">
              <div class="info-title" ref="infoDesc">
                <div>
                  项目信息
                </div>
              </div>
              <div class="info-desc">
                <h3>楼盘信息</h3>
                <p v-if="item.project_name != null">楼盘名称：{{item.project_name}}</p>
                <p v-if="item.unit_price != null">单价：{{item.unit_price}}</p>
                <p v-if="item.area != null">面积：{{item.area}}</p>
                <p v-if="item.total_price != null">总价：{{item.total_price}}万起</p>
                <p v-if="item.delivery_time != null">交房时间：{{item.delivery_time}}</p>
                <p v-if="item.renovation != null">交房标准：{{item.renovation}}</p>
              </div>
              <div class="info-list">
                <span>
                  <img :src="heartImg" alt="">
                </span>
                <div v-if="item.regional_introduction != null">
                  <h3>区域介绍</h3>
                  <p v-for="regItem in item.regional_introduction">{{regItem}}</p>
                </div>
                <span>
                  <img :src="heartImg" alt="">
                </span>
                <div v-if="item.project_introduction != null">
                  <h3>项目介绍</h3>
                  <p v-for="proItem in item.project_introduction">{{proItem}}</p>
                </div>
                <span>
                  <img :src="heartImg" alt="">
                </span>
                <div>
                  <h3 v-if="item.supporting_facilities != null ? true : false">配套设施</h3>
                  <p class="sup-sty" v-if="item.supporting_facilities != null && item.supporting_facilities.length >= 1" v-for="supItem in item.supporting_facilities">{{supItem}}</p>
                </div>
              </div>
            </div>
            <div class="item-photo" v-if="item.property_album != null ? (item.property_album.length >= 1 ? true : false) : false">
              <div class="photo-title" ref="infophoto">
                <div>
                  楼盘效果图
                </div>
              </div>
              <div class="photo-list" v-for="(photoItem, index) in item.property_album">
                <img @load="loadImage" :src="'http://sofmanager.fangsir007.com/image/' + photoItem" alt="">
              </div>
            </div>
            <div class="item-photo" v-if="item.huxing_img != null ? (item.huxing_img.length >= 1 ? true : false) : false">
              <div class="photo-title" ref="infoHuxing">
                <div>
                  户型图
                </div>
              </div>
              <div class="photo-list" v-for="(huItem, index) in item.huxing_img" v-if="item.huxing_img != null ? true : false">
                <img @load="loadImage"   :src="'http://sofmanager.fangsir007.com/image/' + huItem" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroll>
    <div class="toimgpromtp" v-if="isToImg">
      <loading title=""></loading>
      <p>{{isToImgTitle}}</p>
    </div>
  </div>
</template>
<script type="text/babel">
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import MyTitle from 'base/title/title'
  // import { main } from 'common/js/canvasToimg'
  import { getProjectDetail } from 'api/detail'
  import { wechatlib } from '../../config/wxJDK'
  export default {
    data() {
      return {
        exportImg: require('common/image/export.png'),
        isToImg: false,
        isToImgTitle: '正在生成图片,生成成功之后长按图片保存！',
        detailList: [],
        heartImg: require('common/image/heart_07.png'),
        id: this.$route.query.id
      }
    },
    components: {
      Scroll,
      Loading,
      MyTitle
    },
    created() {
      // console.log(this.wx)
      // console.log(main)
      this._getDetail()
    },
    methods: {
      /* consoleHtml2canvas () {
        const self = this
        const todom = document.getElementById('exportImg')
        const shareContent = document.getElementById('htmlToImg') // 需要截图的包裹的（原生的）DOM 对象
        const width = shareContent.offsetWidth // 获取dom 宽度
        const height = shareContent.offsetHeight // 获取dom 高度
        const canvas = document.createElement('canvas') // 创建一个canvas节点
        const scale = 2 // 定义任意放大倍数 支持小数
        canvas.width = width * scale // 定义canvas 宽度 * 缩放
        canvas.height = height * scale // 定义canvas高度 *缩放
        canvas.getContext('2d').scale(scale, scale) // 获取context,设置scale
        const opts = {
          scale: scale, // 添加的scale 参数
          canvas: canvas, // 自定义 canvas
          logging: false, // 日志开关
          width: width, // dom 原始宽度
          height: height // dom 原始高度
        }
        window.html2canvas(shareContent, opts).then(function (canvas) {
          // 或者生成图片库
          // https://github.com/hongru/canvas2image/blob/master/canvas2image.js
          try {
            var dataUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
          } catch (error) {
            var errdataUrl = true
          }
          if (!errdataUrl) {
            var image = new Image()
            image.crossOrigin = ''
            image.src = dataUrl
            console.log(document.body.clientWidth)
            image.width = document.body.clientWidth
            shareContent.innerHTML = ''
            shareContent.insertBefore(image, shareContent.childNodes[0])
            self.isToImgTitle = '生成成功！'
            setTimeout(function() {
              self.$refs.scroll.refresh()
              self.isToImg = false
            }, 2000)
          } else {
            todom.appendChild(canvas)
            self.isToImgTitle = '您的设备暂不支持！'
            setTimeout(function() {
              self.$router.back()
            }, 2000)
          }
        })
      }, */
      loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true
          // const self = this
          setTimeout(function() {
            // self.consoleHtml2canvas()
          }, 4000)
        }
        // this.$refs.scroll.refresh()
      },
      _getDetail() {
        getProjectDetail(this.id).then(res => {
          if (res.data.code !== 0) {
            this.text = '正在整理此项目数据'
            this.$refs.confirm.show()
            return
          }
          if (res.data.data) {
            const data = res.data.data
            this.sliderImg = data.home_page
            this.phone = data.phone
            this.title = data.project_name
            document.title = this.title
            console.log(document.title)
            this.homeImgUrl = 'http://sofmanager.fangsir007.com/image/' + data.home_page[0]
            this.detailList.push(data)
            this._wxconfig()
            /* setTimeout(() => {
              main.htmlToCanvas(window.html2canvas, this.$refs.htmlToImg)
              this.$refs.scroll.refresh()
            }, 3000) */
          }
        })
      },
      async _wxconfig () {
        console.log(window.location.href.split('#'))
        const uri = window.location.pathname + window.location.search
        await wechatlib(this, uri)
        const link = window.location.href
        const self = this
        self.wx.ready(function() {
          self.wx.onMenuShareTimeline({
            title: self.title, // 分享标题
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: self.homeImgUrl, // 分享图标
            success: function (res) {
              console.dir('success', res)
            },
            cancel: function (res) {
              console.dir('cancel', res)
            }
          })
        })
        self.wx.onMenuShareAppMessage({
          title: self.title, // 分享标题
          desc: '小区品质非常的好，在此生活享受进则安逸，出则繁华的生活。', // 分享描述
          link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: self.homeImgUrl, // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function (res) {
            console.dir('success', res)
          },
          cancel: function (res) {
            console.dir('cancel', res)
          }
        })
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable" 
  .show-detail
    position: fixed
    width: 100%
    bottom: 0
    height: 100%
    z-index: 888
    background: #eee
    font-size: $font-size-medium
    img
      width: 100%
    .title
      position: fixed
      z-index: 999
      width: 100%
      text-align: center
      line-height: 40px
      font-size: $font-size-large-x
      color: white
      background: rgba(0, 0, 0, 0.5)
      top: 0
      .export-img
        position: absolute
        top: 8px
        right: 16px
        img
          width: 24px
    .list
      position: fixed
      top: 0
      bottom: 55px
      width: 100%
      padding-top: 50px
      .detail-list
        background: #eee
        .detail-child
          background: #eee
          img
            height: 100%
            width: 100%
      .slider-wrapper
        position: relative
        width: 100%
        height: 200px
        img
          width: 100%
          height: 200px
      .item-title
        position: relative
        width: 100%
        margin: 0 auto
        height: 80px
      .item-addr
        position: absolute
        top: -30px
        left: 6%
        width: 80%
        padding-top: 20px
        overflow: hidden
        border-radius: 10px
        background: white
        text-align: center
        height: 100%
        overflow: hidden
        padding: 4%
        span
          line-height: 20px
        .pink
          font-size: $font-size-large-x
          line-height: 30px
          color: #333
          font-weight: 700
    .item-motto
      padding: 0 10px
      background: white
      color: #e57b00
      line-height: 17px
    .item-desc
      padding: 0 10px
      margin: 10px 0
      p
        line-height: 22px
        text-indent: 2em    
    .item-sell
      padding: 20px 10px
      background: white
      margin-top: 10px
      >div
        border-left: none
        padding: 10px 10px 20px 0
        .pro-sell
          color: #ff5f00
          display: inline-block
          position: relative
          top: -15px
          border-left: 4px solid  #ff5f00
          padding-left: 20px
          height: $font-size-large
          font-size: $font-size-large
        .item-sell-child
          display: flex
          .sell-l
            padding-top: 2px
            width: 15px
            line-height: 28px
            color: #e57b00
          .sell-r
            line-height: 30px
            color: #036ed9
            padding-left: 10px
    .item-info
      padding: 20px 10px
      background: white
      margin-top: 10px
      .info-title
        color: #fe4b42
        height: 30px
        font-size: $font-size-large
        border-bottom 1px solid #ccc
        >div
          display: inline-block
          height: 29px
          padding: 0 10px
          border-bottom: 2px solid #fe4b42
      .info-desc
        padding-left 10px
        margin-top: 10px
        h3
          text-align: center
          font-size: $font-size-medium-x
          line-height: 40px
        p
          line-height: 30px
      .info-clcik
        width: 180px
        text-align: center
        margin: 0 auto
        margin-top: 10px
        padding: 10px
        background: #f0664c
        border-radius: 5px
        span
          color: #fff
          padding: 10px
          img
            width: $font-size-medium-x
      .info-list
        span
          display: inline-block
          padding: 10px 0
        div
          border-left: 1px solid black
          padding-left: 10px
          h3
            color: #666
            font-size: $font-size-medium-x
            line-height: 60px
          p
            font-size: $font-size-medium
            line-height: 20px
            text-indent: 2em
          span
            padding: 10px
            color: #044cd1     
          .sup-sty
            text-indent: 0
    .item-photo
      padding: 20px 10px
      background: white
      margin-top: 10px
      .hide-span
        display: inline-block
        color: #044cd1
        padding: 15px 
      .photo-title
        color: #fe4b42
        height: 30px
        font-size: $font-size-large
        border-bottom 1px solid #ccc
        >div
          display: inline-block
          height: 29px
          padding: 0 10px
          border-bottom: 2px solid #fe4b42
      .info-clcik
        width: 153px
        margin: 0 auto
        margin-top: 10px
        padding: 10px
        background: #f0664c
        border-radius: 5px
        span
          color: #fff
          padding: 10px
          img
            width: $font-size-medium-x
      .photo-list
        padding: 10px 0 0 0
        width: 100%
        height: 100%
        span
          color: #fff
          padding: 10px
        img
          width: 100% 
  .button-phone
    width: 100%
    background: white
    border-top: 1px solid #ccc
    position: fixed
    bottom: 0
    display: flex
    padding: 10px
    margin-left: -10px
    justify-content: space-around
    .btn
      display: inline-block
      line-height: 34px
      text-decoration: none
      text-align: center
      border-radius: 4px
      border: none
      color: white
      width: 45%
      font-size: $font-size-medium-x
      padding: 1px
      span
        display: inline-block
        font-size: $font-size-medium-x
        i
          font-size: $font-size-medium
    .btn-danger
      background: #0077ec
    .btn-success
      background: #ff4e00
  .toimgpromtp
    position: fixed
    width: 100%
    height: 100%
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: rgba(0, 0, 0, .7)
    padding-top: 50%
    z-index: 999999999
    p
      text-align: center
      color: rgba(255, 255, 255, .7)
      font-size: 15px
  .detail-enter-active, .detail-leave-active
    transition: all 0.3s
  .detail-enter, .detail-leave-to
    transform: translate3d(100%, 0, 0)             
</style>
