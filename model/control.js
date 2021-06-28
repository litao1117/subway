import {
  HTTP
} from '../utils/http.js'
let http = new HTTP();

class controlModel extends HTTP{
  
  // 未处理故障列表
  unRepairList(data, callback) {
    http.request({
      url: `/center/findUnRepair/${data.current}/${data.limit}/${data.count}`,
      // data: data,
      success: res => {
        callback(res);
      }
    })
  }
  // 处理中故障列表
  findRepairing(data, callback) {
    http.request({
      url: `/center/findRepairing/${data.current}/${data.limit}/${data.count}`,
      // data: data,
      success: res => {
        callback(res);
      }
    })
  }
  // 处理完故障列表
  findRepaired(data, callback) {
    http.request({
      url: `/center/findRepaired/${data.current}/${data.limit}/${data.count}`,
      // data: data,
      success: res => {
        callback(res);
      }
    })
  }

  // 派单
  dispatch(data, callback) {
    http.request({
      url: `/center/dispatch`,
      data: data,
      method: 'POST',
      success: res => {
        callback(res);
      }
    })
  }

  // 通过故障id查找故障信息
  findFaultById(data, callback) {
    http.request({
      url: `/center/findFaultById/${data.faultId}`,
      success: res => {
        callback(res);
      }
    })
  }
}


export {
  controlModel
}