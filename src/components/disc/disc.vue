<template>
  <transition name="slide">
        <div class="show-project" v-if="show">
          <div class="title">
            <my-title :title="'垫佣项目'"></my-title>
          </div>
           <scroll 
              ref="scroll" 
              class="recommend-content"
              :pullup="pullup"
              :data="projectList">
                <div>
                  <div style="height: 50px">
                    
                  </div>
                  <recommend-list :projectList="projectList"></recommend-list>
                  <loading v-show="hasMore" title=""></loading>
                  <div v-show="!hasMore" class="no-result-wrapper">
                    <p>{{noResultWrapper}}</p>
                  </div>
                </div>
            </scroll>
        </div> 
  </transition>  
</template>

<script type="text/ecmascript-6">
  import RecommendList from 'base/recommend-list/recommend-list'
  import Scroll from 'base/scroll/scroll'
  import MyTitle from 'base/title/title'
  import { getDianyong } from 'api/recommendList'
  import Loading from 'base/loading/loading'
  export default {
    data() {
      return {
        show: true,
        hasMore: true,
        noResultWrapper: '暂无所需项目,您可在微信给我们留言',
        projectList: [],
        pullup: true
      }
    },
    created() {
      this._getDianyong()
    },
    methods: {
      _getDianyong() {
        this.projectList = []
        getDianyong().then(res => {
          if (!res.data.data.length) {
            this.hasMore = false
            this.noResultWrapper = '暂无所需项目,您可在微信给我们留言'
            return
          }
          if (res.data.data.length < 15) {
            this.hasMore = false
            this.noResultWrapper = '没有更多了'
          }
          this.projectList = res.data.data
        })
      }
    },
    components: {
      RecommendList,
      Scroll,
      Loading,
      MyTitle
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .show-project
    position: fixed
    width: 100%
    top: 0px
    bottom: 0
    z-index: 10000
    font-size: $font-size-medium
    .title
      position: fixed
      top: 0
      width: 100%
      z-index: 10001
    .recommend-content
      position: fixed
      top: 0px
      bottom: 0
      width: 100%
      overflow: hidden
      background: #eee
    .child-list
      position: fixed
      width: 100%
      top: 0px
      bottom: 0
      font-size: $font-size-medium  
    .no-result-wrapper
      height: 50px
      line-height: 40px
      text-align: center  
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>