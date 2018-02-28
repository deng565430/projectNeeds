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

const ExportPage = (resolve) => {
  import('components/exportPage/exportPage').then((module) => {
    resolve(module)
  })
}

// 海外房产
const OverseasList = (resolve) => {
  import('components/overseasList/overseasList').then((module) => {
    resolve(module)
  })
}

export default [
  {
    path: '/',
    component: RecommendList,
    meta: { keepAlive: true }
  }, {
    path: '/recommendList/',
    component: RecommendList,
    meta: { keepAlive: true },
    name: 'recommendList'
  }, {
    path: '/detail',
    component: Details
  }, {
    path: '/bannerDetail',
    component: BannerDetail,
    meta: { keepAlive: true }
  }, {
    path: '/exportPage',
    component: ExportPage,
    name: 'exportPage',
    mate: { keepAlive: true }
  }, {
    path: '/overseasList',
    component: OverseasList,
    meta: { keepAlive: true }
  }]

