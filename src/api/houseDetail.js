import axios from 'axios'
import { http } from './config'

export function getProjectDetail (name) {
  const url = `${http}/pro/house2price/getHoue2PriceByProject?name=${name}`

  return axios.get(url)
}
