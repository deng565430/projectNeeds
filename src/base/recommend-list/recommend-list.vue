<template>
  <div>
    <div class="project-list" v-if="projectList.length">
        <ul>
          <li @click.stop="projectDetail(item.id)" :key="index" class="item" v-for="(item, index) in projectList">
            <div tag="div" class="item-list" >
              <div class="item-img">
                <div class="item-new">
                  <img v-lazy="'http://sofmanager.fangsir007.com/image/' + item.list_chart">
                </div>
              </div>
            </div>
            <div class="item-right">
              <div class="item-center">
                <ul>
                  <li v-if="item.project_name != null">{{item.project_name}} {{item.province}} {{item.city}}</li>
                  <li v-if="item.district != null">{{item.district}}</li>
                  <li v-if="item.type != null">{{item.area}} | {{item.type}}</li>
                  <li v-if="item.brokerage != null">{{item.brokerage}} (项目佣金)</li>
                  <li v-if="item.commission != null">{{item.commission}} (个人佣金)</li>
                </ul>
              </div>
              <div class="cen-par-right">
                <a v-if="item.inStock === 0" @click.stop="linkTo(item.id)" class="cen-right">
                  报 备
                </a>
                <a v-else @click.stop="fenxiao(item.project_name, item.id)" class="cen-right bg-color">
                  求合作
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
  export default {
    props: {
      projectList: {
        type: Array,
        default: []
      }
    },
    methods: {
      linkTo(id) {
        this.$emit('buryingPoint', true)
        window.location = '/recommend?id=' + id
      },
      fenxiao(projectname, id) {
        this.$emit('projectnewest', {projectname, id})
      },
      projectDetail (id) {
        console.log(this.$route)
        if (this.$route.path === '/overseasList') {
          this.$emit('buryingPoint', false, 'over')
          this.$router.push({path: '/detail', query: {id: id, isover: 'over'}})
        } else {
          this.$emit('buryingPoint', false)
          this.$router.push({path: '/detail', query: {id: id, isover: 'no'}})
        }
        // this.$emit('buryingPoint', false, 'over')
        // this.$router.push({path: '/detail', query: {id: id, isover: 'over'}})
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
          li:nth-child(4)
            color: #ff390a
            font-size: 13px
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
          .bg-color
            background-color: #0077ed
</style>
