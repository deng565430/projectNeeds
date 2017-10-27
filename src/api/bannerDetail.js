import axios from 'axios'
import { http } from './config'

export function countNum () {
  const url = `${http}/user/addViewLog?type=11`

  return axios.get(url)
}