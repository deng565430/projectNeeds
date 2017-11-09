import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const RecommendList = (resolve) => {
  import('components/recommendList/recommendList').then((module) => {
    resolve(module)
  })
}

const Details = (resolve) => {
  import('components/details/details').then((module) => {
    resolve(module)
  })
}

const BannerDetail = (resolve) => {
  import('components/bannerDetail/bannerDetail').then((module) => {
    resolve(module)
  })
}

const HousePrice = (resolve) => {
  import('components/housePrice/housePrice').then((module) => {
    resolve(module)
  })
}

const HouseDetails = (resolve) => {
  import('components/houseDetails/houseDetails').then((module) => {
    resolve(module)
  })
}

const ExportPage = (resolve) => {
  import('components/exportPage/exportPage').then((module) => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      component: RecommendList
    },
    {
      path: '/',
      component: RecommendList,
      name: 'recommendList',
      children: [{
        path: 'detail/:id',
        component: Details,
        name: 'detail',
        mate: { keepAlive: true }
      }, {
        path: 'bannerDetail',
        component: BannerDetail,
        name: 'bannerDetail',
        mate: { keepAlive: true }
      }]
    }, {
      path: '/housePrice',
      component: HousePrice,
      children: [{
        path: 'houseDetail/:pro',
        component: HouseDetails,
        name: 'detail',
        mate: { keepAlive: true }
      }]
    }, {
      path: '/exportPage/:id',
      component: ExportPage,
      name: 'exportPage',
      mate: { keepAlive: true }
    }]
})
