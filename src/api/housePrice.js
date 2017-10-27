import {
  http
} from './config'
import axios from 'axios'

export function getProjectList(start, length, province, city, district, type, pricemin, pricemax, projectName) {
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

  return axios.get(url, data)
}

export function getTypeList() {
  const url = `${http}/pro/house2price/getHseTypeList`

  return axios.get(url)
}

export function getProvincelist() {
  const url = `${http}/pro/house2price/getProvince`

  return axios.get(url)
}

export function getDistirctlist(city) {
  const url = `${http}/pro/house2price/getDistrictByCity?city=${city}`

  return axios.get(url)
}

export function getCitylist(data) {
  const url = `${http}/pro/house2price/getCityByProvince?province=${data}`

  return axios.get(url)
}

export function getDianyong() {
  const url = `${http}/pro/getDianyong`

  return axios.get(url)
}

export function getBannerImg(projectName, start, length) {
  const url = `${http}/pro/house2price/getHoue2PriceByProjectName?project_name=${projectName}&start=${start}&length=${length}`

  return axios.get(url)
}

export function searchPorjectList(projectName, start, length) {
  const url = `${http}/pro/house2price/getHoue2PriceByProjectName?project_name=${projectName}&start=${start}&length=${length}`

  return axios.get(url)
}

export function getProjectLists(start, length, province, city, district, type, pricemin, pricemax, allPricemin, allPricemax) {
  const url = `${http}/pro/house2price/getHoue2PriceByArea?city=${city}&start=${start}&length=${length}&province=${province}&district=${district}&type=${type}&pricemin=${pricemin}&pricemax=${pricemax}&allPricemin=${allPricemin}&allPricemax=${allPricemax}`

  return axios.get(url)
}

export function countNum() {
  const url = `${http}/user/addViewLog?type=12`

  return axios.get(url)
}