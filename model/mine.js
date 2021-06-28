import {
  HTTP
} from '../utils/http.js'
let http = new HTTP();

class mineModel extends HTTP {
  postMyInfo(data, callback) {
    http.request({
      url:'/common/register',
      data: data,
      method: 'POST',
      success: (res) => {
        callback(res)
      }
    })
  }
  updateMyInfo(data, callback) {
    http.request({
      url:'/common/update',
      data: data,
      method: 'POST',
      success: (res) => {
        callback(res)
      }
    })
  }
}


export {
  mineModel
}