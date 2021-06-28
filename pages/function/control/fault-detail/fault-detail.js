// pages/function/control/fault-detail/fault-detail.js
import {userModel} from "../../../../model/user"
import {controlModel} from "../../../../model/control"
let usermodel = new userModel();
let controlmodel = new controlModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    repair: [],
    header: [

    ],
    currentRepair: [],
    faultInfo: {

    }
  },
  checkboxChange({ detail = {} }) {
    console.log(detail)
    let items = this.data.currentRepair;
    let values = detail.value;
    // for(let i = 0, lenl = values.length; i < lenl; i++) {

    // }
    // const index = this.data.currentRepair.indexOf(detail.value);
    // index === -1 ? this.data.currentRepair.push(detail.value) : this.data.currentRepair.splice(index, 1);
    this.setData({
      currentRepair: values
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _that = this;
    usermodel.findRepairUser("", (res) => {
      console.log(res);
      if(res.code === 200) {
        _that.setData({
          repair: res.data.list
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: "none"
        })
      }
    })
    usermodel.findHeader("", (res) => {
      console.log(res);
      if(res.code === 200) {
        _that.setData({
          header: res.data.list
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: "none"
        })
      }
    })
    const eventChannel = this.getOpenerEventChannel();
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log(data)
      _that.setData({
        faultInfo: data
      })
    })
    console.log(this.data.faultInfo)
  },
  // 派单
  dispatch() {
    let data = {
      "dispatchFaultId": this.data.faultInfo.data.faultId,
      "dispatchToUserId": this.data.currentRepair[0]
    }
    console.log(data)
    controlmodel.dispatch(data, (res) => {
      console.log(res);
      if(res.code === 200) {
        wx.showToast({
          title: '推送成功，等待接单',
          icon: 'success'
        })
        wx.navigateBack({
          delta: 1,
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})