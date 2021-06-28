import {
  config
} from '../config.js'
const app = getApp();


const tips = {

}

class HTTP {

  request(params) {
    // console.log(params)
    //data  url  method
    if (!params.method) {
      params.method = "GET";
      params.header = {
        'id': '1',
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      }
    } else {
      params.method = "POST";
      params.header = {
        'id': '1',
        "Content-Type": "application/json",
        'token': wx.getStorageSync('token')
      }
    }
    // application/x-www-form-urlencoded
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: params.header,
      success: (res) => {
        params.success && params.success(res.data)
      },
      fail: (err) => {
        this._show_error(0)
      }
    })
  }
  _show_error(error_code) {
    if (!error_code) {
      error_code = 0
    }
    wx.showToast({
      title: "错误",
      icon: 'none',
      duration: 2000
    })
  }
}


export {
  HTTP
}