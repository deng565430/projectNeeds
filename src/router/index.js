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

const SwiperDetail = (resolve) => {
  import('components/swiperDetail/swiperDetail').then((module) => {
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

// 完善客户资料
const PerfectDatum = (resolve) => {
  import('components/perfectDatum/perfectDatum').then((module) => {
    resolve(module)
  })
}

// 结佣资料
const MaidDatum = (resolve) => {
  import('components/maidDatum/maidDatum').then((module) => {
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
    path: '/swiperDetail',
    component: SwiperDetail
  }, {
    path: '/exportPage',
    component: ExportPage,
    name: 'exportPage',
    mate: { keepAlive: true }
  }, {
    path: '/overseasList',
    component: OverseasList,
    meta: { keepAlive: true }
  }, {
    path: '/perfectDatum',
    component: PerfectDatum,
    meta: {keepAlive: true}
  }, {
    path: '/maidDatum',
    component: MaidDatum,
    meta: {keepAlive: true}
  }]

