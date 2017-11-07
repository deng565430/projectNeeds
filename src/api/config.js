/**
 * 配置编译环境和线上环境之间的切换
 * http: 域名地址
 */
let http

if (process.env.NODE_ENV === 'development') {
  http = 'http://192.168.1.72:8080' // http://sofmanager.fangsir007.com http://192.168.1.54:80 http://192.168.1.57:8080
} else {
  http = ''
}

export {
  http
}