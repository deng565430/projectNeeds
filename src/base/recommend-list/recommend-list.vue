<template>
  <div>
    <div class="project-list" v-if="projectList.length">
        <ul>
          <li class="item" v-for="item in projectList">
            <router-link tag="div" class="item-list" :to="'/detail/' + item.id ">
              <div class="item-img">
                <div class="item-new">
                  <img v-lazy="'http://sofmanager.fangsir007.com/image/' + item.list_chart">
                </div>
              </div>
            </router-link>
            <div class="item-right">
              <router-link :to="'/detail/' + item.id " class="item-center">
                <ul>
                  <li>{{item.project_name}}</li>
                  <li>{{item.district}}</li>
                  <li>{{item.area}} | {{item.type}}</li>
                  <li>{{item.commission}} (个人到手税前佣金)</li>
                </ul>
              </router-link>
              <div class="cen-par-right">
                <a @touchstart="linkTo(item.id)" class="cen-right">
                  报 备
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      projectList: {
        type: Array,
        default: []
      }
    },
    methods: {
      linkTo(id) {
        window.location = '/recommend?id=' + id
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .project-list
    .item
      background: #fff
      margin-top: 10px
      .item-list
        margin: 5px 0 0
        width: 100%
        .item-img
          padding: 0 10px
          img
            width: 100%
            height: 200px
      .item-right
        display: inline-block
        padding: 10px
        text-align: center
        display: flex
        .item-center
          font-size: $font-size-medium
          width: 69%
          padding-right: 5px
          box-sizing: border-box
          li
            width: 100%
            line-height: 20px
            font-size: $font-size-medium
            text-overflow: ellipsis
            white-space: nowrap
            overflow: hidden
            text-align: left
          li:first-child
            color: #333
            font-size: 15px
            font-weight: 900
          li:nth-child(2), li:nth-child(3)
            color: #999
          li:last-child
            color: #ff390a
            font-size: 13px
        .cen-par-right
          padding-top: 25px
          box-sizing: border-box
          width: 31%
          text-align: right
          .cen-right
            display: inline-block
            line-height: 40px
            background: #ef7a00
            color: white
            text-align: center
            border-radius: 5px
            font-size: $font-size-medium-x
            width: 100px
            text-decoration: none
            border: none
            padding: 1px
</style>
