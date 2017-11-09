<template>
<div class="recommend">

        <pop-box class="provincelist" ref="provincelists" v-if="showCitysList" :posTop="clientTop" :typeList="provincelist" @showPopBox="showCityList">
          <div class="pop-city-list" ref="cityList">
             <div  @click.stop.prevent>
               <div class="pop-city-child">
                    <div  class="pop-city-height">
                      <scroll class="pop-city-scroll" v-if="provincelist.length" :data="provincelist">
                        <ul>
                          <li v-for="(item, index) in provincelist" :class="[provinceActive === item.name ? 'cityActive': '']" @touchstart.prevent="selectProvince(item, index)">{{item.name}}</li>
                        </ul>
                      </scroll>
                    </div>
                    <div  class="pop-city-height">
                      <scroll class="pop-city-scroll" v-if="childCitylist.length" :data="childCitylist">
                        <ul ref="citys">
                          <li v-for="(item, index) in childCitylist" :class="[cityActive === item ? 'cityActive': '']" @touchstart.prevent="selectCity(item, index)">{{item}}</li>
                        </ul>
                      </scroll>
                    </div>
                    <div  class="pop-city-height">
                      <scroll class="pop-city-scroll" ref="scrollCity" v-if="districtList.length" :data="districtList">
                        <ul ref="district">
                          <li ref="districtList" v-for="(item, index) in districtList" :class="[districtlistActive === item ? 'cityActive': '']" @touchstart.prevent="selectdistrictlist(item, index)">{{item}}</li>
                        </ul>
                      </scroll>
                    </div>
               </div>
               <div class="pop-city-btn">
                 <a @touchstart.prevent="selectProvinceList">确定选择</a>
               </div>
             </div>
          </div>
        </pop-box>
      <div class="search" ref="search">
        <div class="search-text">
          <p>输入所要查询的项目名称：</p>
        </div>
        <SearchBox ref="searchBox" @searchFocus="searchFocus" @clear="clearValue" :querys="query" @query="onQueryChange"></SearchBox>
      </div>
      <div class="scroll-top-show" ref="typeListClone">
        <ul class="type-list">
          <li v-for="(item, index) in showSelectList" :class="[active === index ? 'active': '']" @click="getTypeList(item, index, true)">{{item.name}}</li>
        </ul>
       </div>
      <pop-box v-if="showTypeList" :posTop="clientTop" :typeList="typeList" @showPopBox="showPopBox">
          <div>
            <ul class="pop-list-child" v-if="typeList.length">
              <li v-for="(item, index) in typeList" :class="[index === selectTypeIndex ? 'select-type-index' : '']" @click.stop.prevent="selectType(item, index)">
                {{item.name}}
              </li>
            </ul>
            <div v-else class="show-loading">
              <loading title=""></loading>
            </div>
          </div>
        </pop-box>
      <div class="scroll">
        <scroll
              ref="scroll"
              class="recommend-content"
              @scroll="scrollStart"
              :listenScroll="true"
              :pullup="pullup"
              :beforeScroll="true"
              @beforeScroll="beforeScroll"
              @scrollToEnd="searchMore"
              :data="projectList">
          <div>
            <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
              <slider>
                <div v-for="item in recommends" class="slider-img">
                  <router-link tag="a" :to="'/detail/' + item.projectid">
                    <p :style="sliderContentText">{{item.project_name}}</p>
                    <img class="needsclick" @load="loadImage" :src="'http://sofmanager.fangsir007.com/image/' + item.image">
                  </router-link>
                </div>
              </slider>
            </div>
            <div>
              <banner></banner>
            </div>
            <div >
              <ul class="type-list"  ref="typeList">
                <li v-for="(item, index) in showSelectList" :class="[active === index ? 'active': '']" @click="getTypeList(item, index)">{{item.name}}</li>
              </ul>
            </div>
            <recommend-list :projectList="projectList"></recommend-list>
            <loading v-show="hasMore" title=""></loading>
            <div v-show="!hasMore" class="no-result-wrapper">
              <p>{{noResultWrapper}}</p>
            </div>
          </div>
        </scroll>
      </div>
      <div class="scroll-to-top" ref="scrollToTop" @click="scrollToTop">
        <i class="icon-scrollTop"></i>
      </div>
      <div class="to-one-price" @click="toOnePrice">
        <img :src="onePrice" alt="">
      </div>

        <router-view></router-view>

</div>
</template>

<script>
const selectList = [{
  name: '区域',
  type: 'all'
}, {
  name: '总价',
  pricemax: 'all',
  pricemin: 'all'
}, {
  name: '物业类型',
  type: 'all'
}]
const NUM = 255
import { getProjectList, getTypeList, getProvincelist, getCitylist, getDistirctlist, getBannerImg } from 'api/recommendList'
import Slider from 'base/slider/slider'
import SearchBox from 'base/search-box/search-box'
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import RecommendList from 'base/recommend-list/recommend-list'
import PopBox from 'base/pop-box/pop-box'
import Banner from 'base/banner/banner'
export default {
  components: {
    Slider,
    Loading,
    Scroll,
    SearchBox,
    RecommendList,
    PopBox,
    Banner
  },
  data () {
    return {
      noResultWrapper: '暂无所需项目,您可在微信给我们留言',
      recommends: [],
      projectList: [],
      typeList: [],
      typeListModel: [],
      onePrice: require('common/image/yifangyijia.png'),
      active: 3,
      provinceActive: '',
      query: '',
      cityActive: '',
      districtlistActive: '',
      pullup: true,
      hasMore: true,
      showTypeList: false,
      showCitysList: false,
      start: 0,
      length: 10,
      province: 'all',
      city: 'all',
      district: 'all',
      type: 'all',
      pricemin: 'all',
      pricemax: 'all',
      projectName: 'all',
      priceList: [{
        name: '全部',
        pricemax: 'all',
        pricemin: 'all'
      }, {
        name: '100万以下',
        pricemax: '100',
        pricemin: 'all'
      }, {
        name: '100万-300万',
        pricemax: '300',
        pricemin: '100'
      }, {
        name: '300万-500万',
        pricemax: '500',
        pricemin: '300'
      }, {
        name: '500万以上',
        pricemax: 'all',
        pricemin: '500'
      }],
      showSelectList: selectList,
      provincelist: [{
        name: '全部',
        provinceType: 'all'
      }],
      childCitylist: [],
      districtList: [],
      show: true,
      clientTop: 0,
      selectTypeIndex: -1,
      sliderContentText: {
        width: document.body.clientWidth + 'px'
      }
    }
  },
  created () {
    this._getProjectList()
    this._getTypeList()
    this._getBannerImg()
  },
  computed: {},
  methods: {
    loadImage() {
      if (!this.checkloaded) {
        this.checkloaded = true
      }
      this.$refs.scroll.refresh()
    },
    showPopBox(data) {
      this.showTypeList = false
    },
    showCityList() {
      this.showCitysList = false
    },
    searchFocus() {
      this.$refs.typeListClone.style.top = '200px'
      this.showCitysList = false
      this.showTypeList = false
      this.$refs.search.style.top = '0'
      this.$refs.scroll.scrollTo(0, -200, 200)
      this.$refs.scroll.disable()
      setTimeout(() => {
        this.$refs.search.style.top = '-50px'
        this.$refs.typeListClone.style.top = '50px'
        this.showCitysList = false
        this.showTypeList = false
        this.$refs.scroll.scrollTo(0, -NUM, 600)
        this.$refs.scroll.enable()
      }, 4000)
    },
    scrollStart(pos) {
      const y = Math.abs(Math.floor(pos.y))
      let num = y / 10000
      if (num < 0.2) {
        if (this.$refs.scrollToTop.style.display !== 'none') {
          this.$refs.scrollToTop.style.display = 'none'
        }
      } else {
        if (this.$refs.scrollToTop.style.display !== 'block') {
          this.$refs.scrollToTop.style.display = 'block'
        }
      }
      if (num > 0.7) {
        num = 0.7
      }
      if (y > NUM) {
        if (this.$refs.typeListClone.style.display !== 'block') {
          this.$refs.typeListClone.style.display = 'block'
        }
      } else {
        if (this.$refs.typeListClone.style.display !== 'none') {
          this.$refs.typeListClone.style.display = 'none'
        }
      }
      this.$refs.scrollToTop.childNodes[0].style.color = `rgba(0, 0, 0, ${num})`
    },
    onQueryChange(query) {
      if (this._trim(query) === '') {
        return
      }
      this.showSelectList = [{
        name: '区域',
        type: 'all'
      }, {
        name: '总价',
        pricemax: 'all',
        pricemin: 'all'
      }, {
        name: '物业类型',
        type: 'all'
      }]
      this.city = 'all'
      this.province = 'all'
      this.start = 0
      this.pricemax = 'all'
      this.pricemin = 'all'
      this.type = 'all'
      this.district = 'all'
      this.start = 0
      this.query = query
      this.projectName = this._trim(query)
      if (this.projectName === 'all') {
        this._getProjectList()
        return
      }
      this.projectList = []
      getProjectList(this.start, this.length, 'all', 'all', 'all', 'all', 'all', 'all', this.projectName).then(res => {
        if (res.data.recordsTotal === 0) {
          this.hasMore = false
          this.noResultWrapper = '暂无所需项目,您可在微信给我们留言'
          return
        }
        if (res.data.data.length < 10) {
          this.hasMore = false
          this.noResultWrapper = '没有更多了'
        }
        this.projectList = res.data.data
      })
      setTimeout(() => {
        this.$refs.scroll.scrollTo(0, -NUM)
      }, 50)
    },
    clearValue() {
      this.projectName = 'all'
      this.city = 'all'
      this.province = 'all'
      this.start = 0
      this.pricemax = 'all'
      this.pricemin = 'all'
      this.type = 'all'
      this.district = 'all'
      this._getProjectList()
    },
    getTypeList(item, index, flag) {
      this.$refs.scroll.scrollTo(0, -NUM)
      if (flag) {
        this.clientTop = this.$refs.typeListClone.getBoundingClientRect().top + this.$refs.typeListClone.getBoundingClientRect().height - 2
      } else {
        this.clientTop = this.$refs.typeList.getBoundingClientRect().top + this.$refs.typeList.getBoundingClientRect().height
      }
      this.$refs.scroll.disable()
      this.typeList = []
      this.active = index
      this.childCitylist = []
      this.districtList = []
      if (index === 1) {
        this.typeList = this.priceList
      } else if (index === 2) {
        this.typeList = this.typeListModel
      } else {
        this._getProvincelist()
        this.showTypeList = false
        setTimeout(() => {
          this.showCitysList = true
        }, 20)
        return
      }
      this.selectTypeIndex = -1
      this.showCitysList = false
      setTimeout(() => {
        this.showTypeList = true
      }, 20)
    },
    selectProvince(item, index) {
      this.showSelectList[this.active].name = item.name === '全部' ? '区域' : item.name
      this.provinceActive = item.name
      this.province = item.provinceType
      this.childCitylist = []
      this.districtList = []
      this.cityActive = ''
      this.districtlistActive = ''
      this.district = 'all'
      this.city = 'all'
      this._getCitylist()
    },
    selectCity(item, index) {
      this.showSelectList[this.active].name = item === '全部' ? this.provinceActive : item
      this.cityActive = item
      this.city = item === '全部' ? 'all' : item
      this.districtList = []
      this.district = 'all'
      this.districtlistActive = ''
      this._getdistrictlist()
    },
    selectdistrictlist(item, index) {
      this.showSelectList[this.active].name = item === '全部' ? this.cityActive : item
      this.districtlistActive = item
      this.district = item === '全部' ? 'all' : item
    },
    selectType(item, index) {
      if (item.pricemax) {
        this.pricemin = item.pricemin
        this.pricemax = item.pricemax
      }
      if (item.type) {
        this.type = item.type
      }
      this.projectList = []
      this.start = 0
      this.query = ''
      this.projectName = 'all'
      if (this.active === 2) {
        this.showSelectList[this.active].name = item.name === '全部' ? '物业类型' : item.name
      } else {
        this.showSelectList[this.active].name = item.name === '全部' ? '总价' : item.name
      }
      this._getProjectList()
      this.selectTypeIndex = index
      setTimeout(() => {
        this.showTypeList = false
        this.$refs.scroll.enable()
      }, 20)
      setTimeout(() => {
        this.$refs.scroll.scrollTo(0, 0, 300)
      }, 350)
    },
    searchMore() {
      this.hasMore = true
      this.start ++
      if (this.projectName !== 'all') {
        getProjectList(this.start, this.length, 'all', 'all', 'all', 'all', 'all', 'all', this.projectName).then(res => {
          if (res.data.recordsTotal === 0) {
            this.hasMore = false
            this.noResultWrapper = '暂无所需项目,您可在微信给我们留言'
            return
          }
          if (res.data.data.length < 10) {
            this.hasMore = false
            this.noResultWrapper = '没有更多了'
          }
          this.projectList = this.projectList.concat(res.data.data)
        })
        return
      }
      getProjectList(this.start, this.length, this.province, this.city, this.district, this.type, this.pricemin, this.pricemax, 'all').then(res => {
        if (res.data.recordsTotal === 0) {
          this.hasMore = false
          this.noResultWrapper = '暂无所需项目,您可在微信给我们留言'
          return
        }
        if (res.data.data.length < 10) {
          this.hasMore = false
          this.noResultWrapper = '没有更多了'
        }
        this.projectList = this.projectList.concat(res.data.data)
      })
    },
    selectProvinceList() {
      this.$refs.scroll.enable()
      this.start = 0
      this.query = ''
      this.projectName = 'all'
      this._getProjectList()
      this.showCitysList = false
      setTimeout(() => {
        this.$refs.scroll.scrollTo(0, 0, 300)
      }, 350)
    },
    scrollToTop() {
      this.$refs.scroll.scrollTo(0, 0, 600)
    },
    toOnePrice() {
      this.$router.push('/housePrice')
    },
    beforeScroll() {
      if (this.$refs.searchBox) {
        this.$refs.searchBox.blur()
      }
    },
    _getProjectList (projectName) {
      this.projectList = []
      this.hasMore = true
      getProjectList(this.start, this.length, this.province, this.city, this.district, this.type, this.pricemin, this.pricemax, this.projectName).then(res => {
        if (res.data.recordsTotal === 0) {
          this.hasMore = false
          this.noResultWrapper = '暂无所需项目,您可在微信给我们留言'
          return
        }
        if (res.data.data.length < 10) {
          this.hasMore = false
          this.noResultWrapper = '没有更多了'
        }
        this.projectList = res.data.data
      })
    },
    _getBannerImg() {
      getBannerImg().then(res => {
        this.recommends = res.data.data
      })
    },
    _getTypeList() {
      getTypeList().then(res => {
        this.typeListModel.push({
          name: '全部',
          type: 'all'
        })
        for (let i in res.data.data) {
          this.typeListModel.push({
            name: res.data.data[i],
            type: res.data.data[i]
          })
        }
      })
    },
    _getProvincelist() {
      this.district = 'all'
      this.city = 'all'
      this.childCitylist = []
      this.districtList = []
      this.provinceActive = ''
      this.cityActive = ''
      this.districtlistActive = ''
      if (this.provincelist.length > 1) {
        return
      }
      getProvincelist().then(res => {
        for (let i in res.data.data) {
          this.provincelist.push({
            name: res.data.data[i],
            provinceType: res.data.data[i]
          })
        }
      })
    },
    _getCitylist() {
      if (this.provinceActive === '全部') {
        return
      }
      getCitylist(this.province).then(res => {
        this.childCitylist = res.data.data
        this.childCitylist.unshift('全部')
      })
    },
    _getdistrictlist() {
      if (this.cityActive === '全部') {
        return
      }
      getDistirctlist(this.province, this.city).then(res => {
        this.districtList = res.data.data
        this.districtList.unshift('全部')
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

.recommend
  position: fixed
  width: 100%
  top: 0px
  bottom: 0
  font-size: $font-size-medium
  background: #eee
  .provincelist
    position: fixed
    top: 0
    width:100%
  .search
    height: 100px
    padding: 7px 20px
    background: #ef654f
    position: fixed
    top: -50px
    width: 100%
    z-index: 999
    box-sizing: border-box
    transition: all 0.3s
    .search-text
      height: 50px
      p
        line-height: 50px
        color: white
  .scroll
    position: fixed
    width: 100%
    top: 45px
    bottom: 0
    font-size: $font-size-medium
  .recommend-content
    height: 100%
    .slider-wrapper
      position: relative
      width: 100%
      height: 200px
      overflow: hidden
      .slider-img
        a
          width: 100%
        p
          z-index: 999999
          height: 40px
          line-height: 40px
          background: rgba(0, 0, 0, 0.4)
          position: absolute
          text-align: center
          bottom: 30px
          color: white
          font-size: 30px
          transition: all .4s
        img
          width: 100%
          height: 200px
    .type-list
      display: flex
      justify-content: space-around
      background: $color-highlight-background
      margin: 5px 0 0
      li
        height: 42px
        line-height: 42px
        width: 32%
        text-align: center
        font-size: $font-size-medium-x
        box-sizing: border-box
      .active
        border-bottom: 2px solid #EA8910
    .no-result-wrapper
      text-align: center
      z-index: 800
      p
        line-height: 30px
  .scroll-to-top
    position: fixed
    bottom: 20px
    right: 50px
    font-size: 40px
    z-index: 9999
    display: none
    i
      color: rgba(0, 0, 0, 0)
  .to-one-price
    position: fixed
    height: 100px
    width: 30px
    bottom: 50px
    left: 0px
    font-size: 40px
    z-index: 9999
    img
      width: 100%
      height: 100%
  .pop-list-child
    background: white
    padding: 10px
    li
      text-align: center
      line-height: 30px
      color: #7b7b7b
      width: 33%
      margin-bottom: 20px
      box-sizing: border-box
      display: inline-block
    .select-type-index
      background: #f9742a
      color: white
  .pop-city-list
    text-align: center
    position: absolute
    width: 100%
    height: 100%
    z-index: 999
    height: 100%
    background: white
    .pop-city-btn
      height: 50px
      background: $color-highlight-background
      a
        display: inline-block
        background #13CE66
        color: white
        padding: 10px 20px
        border-radius: 6px
    .pop-city-child
      background: $color-highlight-background
      padding: 0 2px
      width: 100%
      box-sizing: border-box
      display: flex
      justify-content: space-around
      align-items: flex-start
      height: 160px
      overflow: hidden
      margin: 10px 0
      .pop-city-height
        width: 33%
        box-sizing: border-box
        .pop-city-scroll
          top: 0
          bottom: 0
          width: 100%
          height: 160px
          overflow: hidden
      li
        line-height: 35px
    .cityActive
      background : #EA8910
      color: white
  .show-loading
    height: 50px
    background: white
    padding-top: 10px
    box-sizing: border-box
  .scroll-top-show
    z-index: 9999
    position: fixed
    top: 50px
    width: 100%
    display: none
    transition: all .3s
    .type-list
      display: flex
      justify-content: space-around
      background: $color-highlight-background
      border-bottom: 1px solid #ccc
      box-sizing: border-box
      li
        height: 42px
        line-height: 42px
        width: 32%
        text-align: center
        font-size: $font-size-medium-x
        box-sizing: border-box
      .active
        border-bottom: 2px solid #EA8910
.slide-enter-active, .slide-leave-active
  transition: all 0.3s

.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
.type-list-enter-active, .type-list-leave-active
  transition: all 0.3s
.type-list-enter, .type-list-leave-to
  transform: translate3d(100%, 0, 0)
@keyframes type-list-clild-fadein
  0%
    opacity: 0
  100%
    opacity: 1
</style>
