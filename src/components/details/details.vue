<template>
  <transition name="detail">
    <div class="show-detail">
          <div class="title" v-if="detailList.length">
            <my-title :title="'项目介绍'"></my-title>
            <router-link tag="div" :to="'/exportPage/' + id" class="export-img"><img :src="exportImg" alt=""></router-link>
          </div>
          <scroll ref="scroll" :beforeScroll="true" @beforeScroll="beforeScroll" :pullup="pullup" class="list" :data="detailList">
            <div class="detail-list">
              <div  v-if="detailList.length">
                <div v-for="item in detailList">
                  <div class="slider-wrapper">
                    <slider :styleBottom="'40px'" v-if="item.home_page != null ? true : false">
                      <div v-for="childItem in item.home_page" v-if="childItem.indexOf('.') > -1">
                        <div>
                          <img class="needsclick" @load="loadImage" :src="'http://sofmanager.fangsir007.com/image/' + childItem">
                        </div>  
                      </div>
                    </slider>
                  </div>
                  <div class="item-title">
                    <div class="item-addr">
                      <h3 class="pink">{{title}} </h3>
                      <span>{{item.address}}</span>
                    </div>
                  </div>
                  <div class="item-comm">
                    <div v-if="item.commission != null" class="comm-t">
                      <div class="l">佣金标准</div>
                      <div class="r">
                        <p>{{item.commission}}</p>
                      </div>
                    </div>
                    <div v-if="item.commission_junction != null" class="comm-b">
                      <span class="l">结佣标准</span>
                      <div class="r">
                        <p v-for="commItem in item.commission_junction">{{commItem}}</p>
                      </div>
                    </div>
                  </div>
                  <div class="item-butt-man">
                    <div class="butt-man-l">
                      <div class="butt-img" v-if="item.img != null">
                        <img :src="'http://sofmanager.fangsir007.com/image/' + item.img" alt="">
                      </div>
                    </div>
                    <div class="butt-man-r">
                      <div>
                        <span class="butt-name">{{item.name}}  </span>
                        <span class="butt-color"> 项目对接人</span>
                      </div>
                      <div>
                        <span class="butt-color">{{item.working_life}} | </span>
                        <span class="butt-color"> 擅长:</span>
                        <span  class="butt-color"v-for="gAtItem in item.good_at"> {{gAtItem}}</span>
                      </div>
                      <div v-if="item.label != null ? (item.label.length > 1 ? true : false) : false">
                        <span class="butt-color" :class="[index % 2 === 0 ? 'butt-first-color' : 'butt-second-color']" v-for="(labelItem, index) in item.label"><i class="icon-gou ic-color">
                        </i> {{labelItem}} </span>
                      </div>
                    </div>
                    <div v-if="item.motto != null" class="item-motto">
                      <p>{{item.motto}}</p>
                    </div>
                    <div v-if="item.self_evaluation != null" class="item-desc">
                      <p>{{item.self_evaluation}}</p>
                    </div>
                  </div>
                  <div class="item-sell" v-if="item.selling_point != null ? (item.selling_point.length > 1 ? true : false) : false">
                    <div>
                      <div class="pro-sell">
                        项目卖点
                      </div>
                      <div class="item-sell-child" v-for="sellItem in item.selling_point" v-if="sellItem.length > 3">
                        <span class="sell-l"><i class="icon-star"></i></span>
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
                        <span class="sell-l"><i class="icon-star"></i></span>
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
                    <div class="info-clcik" v-if="!isShow" @click="showMove"><span>点击查看更多信息 <i class="icon-arrow"></i></span></div>
                    <div class="info-list" v-if="isShow">
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
                        <span @click="hideMove">折叠以上信息</span>
                      </div>
                    </div>
                  </div>
                  <div class="item-photo"  v-if="item.property_album != null ? (item.property_album.length >= 1 ? true : false) : false">
                      <div class="photo-title" ref="infophoto">
                        <div>
                          楼盘效果图
                        </div>
                      </div>
                      <div class="photo-list">
                        <img  @load="loadImage" v-lazy="'http://sofmanager.fangsir007.com/image/' + item.property_album[0]" alt="">
                      </div>
                      <div class="info-clcik" v-if="!isShowPhoto" @click="showMove('photo')"><span>点击查看更多信息 <i class="icon-arrow"></i></span></div>
                      <div v-if="isShowPhoto">
                        <div class="photo-list" v-for="(photoItem, index) in item.property_album" v-if="index === 0 ? false : true && photoItem.indexOf('.') > -1">
                          <img  @load="loadImage" v-lazy="'http://sofmanager.fangsir007.com/image/' + photoItem" alt="">
                        </div>
                        <span class="hide-span" @click="hideMove('photo')">{{item.property_album.length > 1 ? '折叠以上信息' : '没有更多了'}}</span>
                      </div>
                  </div>
                  <div class="item-photo" v-if="item.huxing_img != null ? (item.huxing_img.length >= 1 ? true : false) : false">
                      <div class="photo-title" ref="infoHuxing">
                        <div>
                          户型图
                        </div>
                      </div>
                      <div class="photo-list" v-if="item.huxing_img != null ? true : false">
                        <img  @load="loadImage" v-lazy="'http://sofmanager.fangsir007.com/image/' + item.huxing_img[0]" alt="">
                      </div>
                      <div class="info-clcik" v-if="!isShowHuxing" @click="showMove('huxing')"><span>点击查看更多信息 <i class="icon-arrow"></i></span></div>
                      <div v-if="isShowHuxing">
                        <div class="photo-list" v-for="(huItem, index) in item.huxing_img" v-if="index === 0 ? false : true && huItem.indexOf('.') > -1">
                          <img  @load="loadImage" v-lazy="'http://sofmanager.fangsir007.com/image/' + huItem" alt="">
                        </div>
                        <span class="hide-span" @click="hideMove('huxing')">{{item.huxing_img.length > 1 ? '折叠以上信息' : '没有更多了'}}</span>
                      </div>  
                  </div>
                  <div class="item-rule">
                    <div>
                      <h3><i class="icon-book"></i>项目报备规则：</h3>
                      <p>项目报备途径：{{item.way}}</p>
                      <p>系统报备客户姓名标准：{{item.name_standard}}</p>
                      <p>系统报备客户电话标准：{{item.tel_standard}}</p>
                      <p>报备有效时间：{{item.protect_date}}</p>
                      <h3><i class="icon-book"></i>客户确认规则：与客户同时到场</h3>
                      <p>系统确认客户姓名标准：{{item.name_standard}}</p>
                      <p>系统确认客户电话标准：{{item.customertel_standard}}</p>
                      <p>确认客户保护期：{{item.customerprotect_date}}</p>
                    </div>
                  </div>
                </div>
                <div class="item-msg">
                    <div class="msg-title">
                      <div>
                          精选留言
                      </div>
                    </div>
                    <div class="msg-wall">
                      <img :src="messageWall" alt="">
                    </div>
                    <div class="write-msg" v-if="!msgIsShow">
                      <span  @click="showMsg">写留言<img :src="writeImg" alt=""></span>
                    </div>
                    <div class="msg" ref="msg" v-if="msgIsShow">
                        <div class="msg-text">
                          <textarea ref="textareas" class="text" :value="textarea" v-model="textarea" placeholder='请输入'></textarea>
                        </div>
                        <div class="msg-btn" ref="msgSend">
                          <div>
                            <button type="button" ref="send"  :disabled="_trim(textarea) !== '' ? false : 'disabled'" :class="_trim(textarea) !== '' ? 'btn' : 'disabled'" @click="send">{{_trim(textarea) === '' ? '请填写留言' : '发送'}}</button>
                          </div>
                        </div>
                    </div>
                    <div v-if="userMsg.length">
                      <div class="user-msg" v-for="item in userMsg">
                        <h3>{{item.username}}</h3>
                        <p>{{item.content}}</p>
                        <p class="user-msg-time">{{item.createtime ? item.createtime.split(' ')[0] : ''}}</p>
                      </div>
                    </div>
                    <div v-else class="no-msg">
                      还没有留言哦，快去发布吧~
                    </div>
                    <div style="height: 100px">
                      
                    </div>
                </div>
              </div>
              <div v-else>
                  <loading title=""></loading>
                </div>  
            </div>
          </scroll>
          <div>
           <confirm ref="confirm" @confirm="confirmClear" @cancel="confirmClear" :text="text" :confirmBtnText="confirmBtnText"></confirm>
          </div>
          <div class="button-phone" v-if="detailList.length">
            <a class="btn btn-danger" :href="'tel:' + phone"><span><i class="icon-phone"></i>  联系人电话</span></a>
            <a class="btn btn-success" :href="'/recommend?id=' + id"><span><i class="icon-report"></i>  我要报备</span></a>
          </div>
    </div>
  </transition>
</template>
<script type="text/babel">
  import Scroll from 'base/scroll/scroll'
  import Slider from 'base/slider/slider'
  import confirm from 'base/confirm/confirm'
  import Loading from 'base/loading/loading'
  import MyTitle from 'base/title/title'
  import { getProjectDetail, getCommentlist, addComment } from 'api/detail'
  export default {
    data() {
      return {
        exportImg: require('common/image/export.png'),
        pullup: true,
        detailList: [],
        sliderImg: [],
        messageWall: require('common/image/message_wall.png'),
        heartImg: require('common/image/heart_07.png'),
        writeImg: require('common/image/xie.png'),
        isShow: false,
        isShowPhoto: false,
        isShowHuxing: false,
        msgIsShow: false,
        userMsg: [],
        id: this.$route.params.id,
        textarea: '',
        text: '',
        confirmBtnText: '确定',
        title: '',
        phone: ''
      }
    },
    components: {
      Scroll,
      Slider,
      confirm,
      Loading,
      MyTitle
    },
    created() {
      this._getDetail()
      this._getCommentlist()
    },
    methods: {
      loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true
        }
        this.$refs.scroll.refresh()
      },
      showMove(name) {
        if (name === 'photo') {
          this.isShowPhoto = true
        } else if (name === 'huxing') {
          this.isShowHuxing = true
        } else {
          this.isShow = true
        }
        setTimeout(() => {
          this.$refs.scroll.refresh()
        }, 20)
      },
      hideMove(name) {
        if (name === 'photo') {
          this.isShowPhoto = false
          if (!this.$refs.infophoto[0]) {
            return
          }
          this.$refs.scroll.scrollToElement(this.$refs.infophoto[0], 600)
        } else if (name === 'huxing') {
          this.isShowHuxing = false
          if (!this.$refs.infoHuxing[0]) {
            return
          }
          this.$refs.scroll.scrollToElement(this.$refs.infoHuxing[0], 600)
        } else {
          this.isShow = false
          if (!this.$refs.infoDesc[0]) {
            return
          }
          this.$refs.scroll.scrollToElement(this.$refs.infoDesc[0], 600)
        }
        setTimeout(() => {
          this.$refs.scroll.refresh()
        }, 20)
      },
      showMsg() {
        this.msgIsShow = true
        setTimeout(() => {
          this.$refs.scroll.refresh()
        }, 20)
      },
      send() {
        if (this.textarea === '') {
          this.text = '请输入内容'
          this.$refs.confirm.show()
          return
        }
        this.text = '发送成功，请等待留言审核..'
        this.$refs.confirm.show()
        addComment(this.id, this.textarea).then(res => {
          if (res.data.code !== 0) {
            this.text = '网络异常..'
            this.$refs.confirm.show()
          }
        })
        this.textarea = ''
      },
      confirmClear() {
        if (this.text === '正在整理此项目数据') {
          this.$router.back()
        }
      },
      beforeScroll() {
        if (this.$refs.textareas) {
          this.$refs.textareas.blur()
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
            this.sliderImg = data.home_page
            this.phone = data.phone
            this.title = data.project_name
            this.detailList.push(data)
          }
        })
      },
      _getCommentlist() {
        getCommentlist(this.id).then(res => {
          if (res.data.data) {
            const data = res.data.data
            this.userMsg = data
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
  
  .show-detail
    position: fixed
    width: 100%
    bottom: 0
    height: 100%
    z-index: 10000
    background: #eee
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
    .list
      position: fixed
      top: 0
      bottom: 55px
      width: 100%
      padding-top: 50px
      .detail-list
        background: #eee
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
      .item-comm
        margin-top: 10px
        background: white
        padding-bottom: 10px
        z-index: 99999
        .comm-t, .comm-b
          text-align: center
          border-radius: 10px
          overflow: hidden
          margin: 10px 10px 0
        .l
          display: block
          width: 100%
          background: #ff5f00
          line-height: 35px
          color: white
          font-size: $font-size-medium-x
        .r
          display: block
          text-align: left
          line-height: 30px
          text-indent: 2em
          border-radius: 0 0 10px 10px
          padding: 10px
          border: 1px solid #ccc
          border-top: none
          p
            line-height: 20px
    .item-butt-man
      margin: 10px 0
      padding-bottom: 10px
      text-align: center
      background: white
      .butt-man-l
        width: 120px
        height: 120px
        margin: 15px auto
        padding-top: 10px
        .butt-img
          border-radius: 50%
          overflow: hidden
          width: 120px
          height: 120px
        img
          width: 100%
      .butt-man-r
        margin: 10px 0
        span
          line-height: 25px
        .butt-name
          font-size: $font-size-medium-x
        .butt-color
          color: #949494
        .butt-second-color  
          border: 1px solid #f39800
          margin-right: 10px
          padding: 3px
          border-radius: 5px
        .butt-first-color
          border: 1px solid #89c997
          margin-right: 10px
          padding: 3px
          border-radius: 5px  
        i
          display: inline-block
          vertical-align: middle
          color: #b5b0d3
          font-size: 20px
          height: 20px
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
    .item-rule
      padding: 20px 10px
      background: white
      margin-top: 10px
      div
        border: 1px dotted #b6e4fd
        border-radius: 15px
        padding: 20px 10px
        h3
          font-size: $font-size-medium-x
          font-weight: both
          color: black
          line-height: 50px
          i
            margin-right: 10px
            font-size: $font-size-medium-x
            color: #ff4e00
        p
          height: 35px
          line-height: 15px
          color:#7f7f7f
    .item-msg
      padding: 20px 10px
      background: white
      margin-top: 10px
      .msg-title
        color: #fe4b42
        height: 30px
        font-size: $font-size-large
        border-bottom 1px solid #ccc
        >div
          display: inline-block
          height: 29px
          padding: 0 10px
          border-bottom: 2px solid #fe4b42
      .msg-wall
        width: 100px
        margin: 10px auto
        img
          width: 100%    
      .write-msg
        text-align: right
        img
          width: $font-size-medium
          vertical-align: middle
      .msg
        .msg-text
          padding: 20px 20px 0
          .text
            resize: vertical
            line-height: 15px
            width: 100%
            color: #1f2d3d
            background-color: #fff
            background-image: none
            border: 1px solid #ff4e00
            border-radius: 4px
            transition: border-color .2s cubic-bezier(.645,.045,.355,1)
            height: 70px
        .msg-btn
          width: 100%
          margin: 10px 0
          >div
            width: 40%
            margin: 0 55%
          .btn
            background: #20a0ff
            border: none
            border-color: #20a0ff
            border-radius: 4px
            width: 100%
            color: white
            padding: 10px 0
            font-size: $font-size-medium
          .disabled
            background: #FF4949
            border: none
            border-color: #FF4949
            border-radius: 4px
            width: 100%
            color: white
            padding: 10px 0
            font-size: $font-size-medium  
      .user-msg
        margin-top: 20px
        h3
          color: #533f80
          font-size: $font-size-medium-x
          line-height: 30px
        p
          line-height: 20px  
        .user-msg-time
          color: #ccc
          font-size: $font-size-small-s      
      .no-msg
        color: #ccc
        text-align: center
          
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
  .detail-enter-active, .detail-leave-active
    transition: all 0.3s
  .detail-enter, .detail-leave-to
    transform: translate3d(100%, 0, 0)             
</style>
