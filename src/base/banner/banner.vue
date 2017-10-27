<template>
  <div>
   <div class="banner-img">
      <div class="img-list" @click="showProject">
          <img :src="active1" alt="">
      </div>
      <div class="img-list">
          <router-link to="/bannerDetail">
            <img :src="active2" alt="">  
          </router-link>
      </div>
   </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        active1: require('common/image/active_1.jpg'),
        active2: require('common/image/active_2.jpg')
      }
    },
    methods: {
      showProject () {
        this.$emit('showProject')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .banner-img
    display: flex
    .img-list
      width: 50%
      img
        width: 100%
        height: 100%
</style>