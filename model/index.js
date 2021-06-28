import {
  HTTP
} from '../utils/http.js'
let http = new HTTP();

class indexModel extends HTTP {
  // 登录
  ifStartUp(data, callback) {
    http.request({
      url:'/common/login',
      data:data,
      success: (res) => {
        callback(res)
      }
    })
  }
}

export {
  indexModel
}