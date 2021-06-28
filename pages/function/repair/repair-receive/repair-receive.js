// pages/function/repair/repair-receive/repair-receive.js
import {controlModel} from "../../../../model/control"
const controlmodel = new controlModel();
import {repairModel} from "../../../../model/repiar"
const repairmodel = new repairModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    faultInfo: {
      "faultId": "integer",
      "faultEquipment": "string",
      "faultPlace": "integer",
      "faultDescribe": "string",
      "faultInspectionUserId": "string",
      "faultControlUserId": "string",
      "faultRepairUserId": "string",
      "inspectionUserName": "string",
      "controlUserName": "string",
      "repairUserName": "string",
      "userAvatar": "string",
      "createTime": "string"
    },
    dispatchId: '',
    btn: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      dispatchId: options.dispatchId
    })
    let data = {
      faultId: options.faultId
    };
    controlmodel.findFaultById(data, (res) => {
      res.data.faultVo.createTime = new Date(res.data.faultVo.createTime).toLocaleString();
      if(res.code === 200) {
        this.setData({
          faultInfo: res.data.faultVo
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
    }) 
  },
  bindButtonTap: function() {
    this.setData({
      focus: true
    })
  },
  agree: function() {
    let data = {
      "dispatchId": this.data.dispatchId,
      "faultId": this.data.faultInfo.faultId,
      "refused": "",
      "repairUserId": wx.getStorageSync('userInfo').userOpenid
    }
    if(!this.data.btn) {
      repairmodel.agree(data, (res) => {
        console.log(res)
        if(res.code === 200) {
          wx.showToast({
            title: '已接单'
          })
          this.data.btn = true;
        } 
      })
    } else {
      wx.showToast({
        title: '您已经接受或拒绝',
        icon: 'none'
      })
    }
  },
  bindFormSubmit: function(e) {
    console.log(e.detail.value.textarea)
    if(!e.detail.value.textarea) {
      wx.showToast({
        title: '请先填写原因或点击接受',
        icon: 'none'
      })
    } else {
      let data = {
        "dispatchId": this.data.dispatchId,
        "faultId": this.data.faultInfo.faultId,
        "refused": e.detail.value.textarea,
        "repairUserId": wx.getStorageSync('userInfo').userOpenid
      }
      if(!this.data.btn) {
        repairmodel.refuse(data, (res) => {
          console.log(res)
          if(res.code === 200) {
            wx.showToast({
              title: '已拒绝'
            })
            this.data.btn = true;
          } 
        })
      } else {
        wx.showToast({
          title: '您已经接受或拒绝',
          icon: 'none'
        })
      }
    } 
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