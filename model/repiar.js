import {
  HTTP
} from '../utils/http.js'
let http = new HTTP();

class repairModel extends HTTP {
  // 同意接单
  agree(data, callback) {
    http.request({
      url: `/maintenance/agree`,
      data: data,
      method: 'POST',
      success: res => {
        callback(res);
      }
    })
  }
    // 同意接单
  refuse(data, callback) {
    http.request({
      url: `/maintenance/refuse`,
      data: data,
      method: 'POST',
      success: res => {
        callback(res);
      }
    })
  }

  // 维修回单
  addRepair(data, callback) {
    http.request({
      url: `/maintenance/addRepair`,
      data: data,
      method: 'POST',
      success: res => {
        callback(res);
      }
    })
  }

  // 未维修列表
  findUnRepair(data, callback) {
    http.request({
      url: `/maintenance/findUnRepair`,
      success: res => {
        callback(res);
      }
    })
  }
}

export {
  repairModel
}