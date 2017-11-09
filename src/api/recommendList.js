import $api from './index'

export function getProjectList (start, length, province, city, district, type, pricemin, pricemax, projectName) {
  const url = '/pro/getprojectlistBydistrict'

  const data = {
    city,
    district,
    length,
    pricemax,
    pricemin,
    project_name: projectName,
    province,
    start,
    type
  }

  // 设置请求头
  // return axios.post(url, data, {headers: {'Accept': 'XMLHttpRequest'}})
  return $api.post(url, data)
}

export function getTypeList () {
  const url = `/pro/getwuye`

  return $api.get(url)
}

export function getProvincelist () {
  const url = `/pro/getProvincelist`

  return $api.get(url)
}

export function getDistirctlist (province, city) {
  const url = `/pro/getDistirctlist`

  const data = {
    province,
    city
  }

  return $api.post(url, data)
}

export function getCitylist (data) {
  const url = `/pro/getCitylist?city=${data}`

  return $api.post(url)
}

export function getDianyong () {
  const url = `/pro/getDianyong`

  return $api.get(url)
}

export function getBannerImg () {
  const url = `/pro/getrotation`

  return $api.get(url)
}
