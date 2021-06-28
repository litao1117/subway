import {
  HTTP
} from '../utils/http.js'
let http = new HTTP();

class userModel extends HTTP{
  // 维修人员列表
  findRepairUser(data, callback) {
    http.request({
      url: "/common/findRepairUser",
      success: (res) => {
        callback(res)
      }
    })
  }
  // 领导人员列表
  findHeader(data,  callback) {
    http.request({
      url: "/common/findHeader",
      success: (res) => {
        callback(res)
      }
    })
  }
  // 查看人员信息
  findUserById(data,  callback) {
    http.request({
      url: `/common/findUserById/${data.openid}`,
      success: (res) => {
        callback(res)
      }
    })
  }
}

export {
  userModel
}