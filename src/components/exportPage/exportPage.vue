<template>
  <div class="export-project" @click="consoleHtml2canvas">
    <div>
      <my-title :title="'项目介绍'"></my-title>
    </div>
    <div class="content" id="htmlToImg">
      <div class="topimg" v-if="detailList.home_page != null ? true : false">
        <img crossorigin="anonymous" class="needsclick" @load="loadImage" :src="'http://sofmanager.fangsir007.com/image/' + detailList.home_page[0]">
      </div>
      <div class="item-title">
        <div class="item-addr">
          <h3 class="pink">{{detailList.project_name}} </h3>
          <span>{{detailList.address}}</span>
        </div>
      </div>
      <div class="item-sell" v-if="detailList.selling_point != null ? (detailList.selling_point.length > 1 ? true : false) : false">
        <div>
          <div class="pro-sell">
            项目卖点
          </div>
          <div class="item-sell-child" v-for="sellItem in detailList.selling_point" v-if="sellItem.length > 3">
            <span class="sell-l"><i class="icon-star"></i></span>
            <span class="sell-r">{{sellItem}}</span>
          </div>
        </div>
      </div>
      <div class="item-sell">
        <div v-if="detailList.dynamic != null">
          <div class="pro-sell">
             最新动态
          </div>
          <div class="item-sell-child">
            <span class="sell-l"><i class="icon-star"></i></span>
            <span class="sell-r">{{detailList.dynamic}}</span>
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
          <p v-if="detailList.project_name != null">楼盘名称：{{detailList.project_name}}</p>
          <p v-if="detailList.unit_price != null">单价：{{detailList.unit_price}}</p>
          <p v-if="detailList.area != null">面积：{{detailList.area}}</p>
           <p v-if="detailList.total_price != null">总价：{{detailList.total_price}}万起</p>
          <p v-if="detailList.delivery_time != null">交房时间：{{detailList.delivery_time}}</p>
          <p v-if="detailList.renovation != null">交房标准：{{detailList.renovation}}</p>
        </div>
       <div class="info-list">
          <span>
             <img ossorigin="anonymous" :src="heartImg" alt="">
          </span>
          <div v-if="detailList.regional_introduction != null">
            <h3>区域介绍</h3>
            <p v-for="regItem in detailList.regional_introduction">{{regItem}}</p>
          </div>
          <span>
            <img crossorigin="anonymous" :src="heartImg" alt="">
          </span>
           <div v-if="detailList.project_introduction != null">
            <h3>项目介绍</h3>
            <p v-for="proItem in detailList.project_introduction">{{proItem}}</p>
           </div>
          <span>
            <img crossorigin="anonymous" :src="heartImg" alt="">
          </span>
           <div>
            <h3 v-if="detailList.supporting_facilities != null ? true : false">配套设施</h3>
            <p class="sup-sty" v-if="detailList.supporting_facilities != null && detailList.supporting_facilities.length >= 1" v-for="supItem in detailList.supporting_facilities">{{supItem}}</p>
          </div>
         </div>
      </div>
      <div class="item-photo"  v-if="detailList.property_album != null ? (detailList.property_album.length >= 1 ? true : false) : false">
          <div class="photo-title" ref="infophoto">
            <div>
              楼盘效果图
            </div>
          </div>
          <div class="photo-list" v-for="(photoItem, index) in detailList.property_album">
            <img crossorigin="anonymous" @load="loadImage" :src="'http://sofmanager.fangsir007.com/image/' + photoItem" alt="">
          </div>
           <div class="item-photo" v-if="detailList.huxing_img != null ? (detailList.huxing_img.length >= 1 ? true : false) : false">
            <div class="photo-title" ref="infoHuxing">
              <div>
                户型图
              </div>
            </div>
            <div class="photo-list" v-if="detailList.huxing_img != null ? true : false">
              <img crossorigin="anonymous" @load="loadImage" :src="'http://sofmanager.fangsir007.com/image/' + detailList.huxing_img[0]" alt="">
            </div>
            <div>
              <div class="photo-list" v-for="(huItem, index) in detailList.huxing_img" v-if="index === 0 ? false : true && huItem.indexOf('.') > -1">
                <img crossorigin="anonymous" @load="loadImage" :src="'http://sofmanager.fangsir007.com/image/' + huItem" alt="">
              </div>
            </div>  
          </div>
      </div>
      <div id="dom">

      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import confirm from 'base/confirm/confirm'
  import MyTitle from 'base/title/title'
  import html2canvas from 'html2canvas'
  import { getProjectDetail } from 'api/detail'
  export default {
    data() {
      return {
        exportImg: require('common/image/export.png'),
        detailList: {},
        messageWall: require('common/image/message_wall.png'),
        heartImg: require('common/image/heart_07.png'),
        writeImg: require('common/image/xie.png'),
        id: this.$route.params.id
      }
    },
    components: {
      confirm,
      MyTitle
    },
    created() {
      this._getDetail()
    },
    methods: {
      consoleHtml2canvas () {
        const dom = document.getElementById('htmlToImg')
        const todom = document.getElementById('dom')
        console.log(dom)
        var w = document.body.scrollWidth
        var h = document.body.scrollHeight
        // 要将 canvas 的宽高设置成容器宽高的 2 倍
        var canvas = document.createElement('canvas')
        canvas.width = w * 2
        canvas.height = h * 2
        canvas.style.width = w + 'px'
        canvas.style.height = h + 'px'
        var context = canvas.getContext('2d')
        // 然后将画布缩放，将图像放大两倍画到画布上
        context.scale(2, 2)
        html2canvas(dom, {
          canvas: canvas,
          onrendered: function(canvas) {
            // console.log(canvas.toDataURL())
            // var dataUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
            todom.appendChild(canvas)
          },
          userCORS: true,
          width: 300,
          height: 300,
          allowTaint: true,
          timeout: 1000
        })
      },
      loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true
        }
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
            this.detailList = data
          }
        })
      },
      _trim(str) {
        return str.replace(/(^\s+)|(\s+$)/g, '')
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  
  .export-project
    font-size: $font-size-medium
    .title
      position: fixed
      z-index: 10002
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
    .content
      .topimg
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
  .detail-enter-active, .detail-leave-active
    transition: all 0.3s
  .detail-enter, .detail-leave-to
    transform: translate3d(100%, 0, 0)             
</style>
