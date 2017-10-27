import { http } from './config'
import axios from 'axios'

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
  return axios.post(url, data)
}

export function getTypeList () {
  const url = `${http}/pro/getwuye`

  return axios.get(url)
}

export function getProvincelist () {
  const url = `${http}/pro/getProvincelist`

  return axios.get(url)
}

export function getDistirctlist (province, city) {
  const url = `${http}/pro/getDistirctlist`

  const data = {
    province,
    city
  }

  return axios.post(url, data)
}

export function getCitylist (data) {
  const url = `${http}/pro/getCitylist?city=${data}`

  return axios.post(url)
}

export function getDianyong () {
  const url = `${http}/pro/getDianyong`

  return axios.get(url)
}

export function getBannerImg () {
  const url = `${http}/pro/getrotation`

  return axios.get(url)
}
