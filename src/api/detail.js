import axios from 'axios'
import { http } from './config'

// const http = 'http://192.168.1.54:80' // http://sofmanager.fangsir007.com   http://192.168.1.54:80

export function getProjectDetail (id) {
  const url = `${http}/pro/getProjectDetail?id=${id}`

  return axios.get(url)
}

export function getCommentlist (id) {
  const url = `${http}/pro/getCommentlist?projectid=${id}`

  return axios.get(url)
}

export function addComment (projectid, content) {
  const url = `${http}/pro/addComment`

  const data = {
    content,
    projectid
  }
  return axios.post(url, data)
}
