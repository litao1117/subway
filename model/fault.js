import {
  HTTP
} from '../utils/http.js'
let http = new HTTP();

class faultModel extends HTTP{
  // 故障上报
  faultAdd(data, callback) {
    http.request({
      url: "/inspection/add",
      method: "POST",
      data: data,
      success: (res) => {
        callback(res);
      }
    })
  }
  // 未处理故障列表
  unRepairList(data, callback) {
    http.request({
      url: `/inspection/findUnRepair/${data.current}/${data.limit}/${data.count}`,
      // data: data,
      success: res => {
        callback(res);
      }
    })
  }
  // 处理中故障列表
  findRepairing(data, callback) {
    http.request({
      url: `/inspection/findRepairing/${data.current}/${data.limit}/${data.count}`,
      // data: data,
      success: res => {
        callback(res);
      }
    })
  }
  // 处理完故障列表
  findRepaired(data, callback) {
    http.request({
      url: `/inspection/findRepaired/${data.current}/${data.limit}/${data.count}`,
      // data: data,
      success: res => {
        callback(res);
      }
    })
  }

  // 直传oss获取formdata
  getFormData(callback) {
    http.request({
      url: "/oss/getSts",
      success: res => {
        callback(res); 
      }
    })
  }
}


export {
  faultModel
}