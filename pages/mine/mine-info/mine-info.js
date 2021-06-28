// pages/mine-info/mine-info.js
import {mineModel} from '../../../model/mine'
let myModel = new mineModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    sexArray: ['男','女'],
    isGrant: false,
    postInfo: {
      "invitationCode": "",
      "userAvatar": "",
      "userBirthday": "2021-04-27",
      "userName": "",
      "userOpenid": "",
      "userSex": "男",
      "userTel": ""
    },
    wxInfo: {},

  },
  bindPickerChange: function(e) {
    this.setData({
      "postInfo.userSex": this.data.sexArray[e.detail.value],
      "userInfo.userSex": this.data.sexArray[e.detail.value]
    })
  },
  bindDateChange: function(e) {
    this.setData({
      "postInfo.userBirthday": e.detail.value,
      "userInfo.userBirthday": e.detail.value
    })
  },
  getData(e) {
    this.data.postInfo[e.detail.nature] = e.detail.value
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(wx.getStorageSync('wxInfo'));
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
      isGrant: wx.getStorageSync('isGrant'),
      wxInfo: wx.getStorageSync('wxInfo'),
      // postInfo: wx.getStorageSync('userInfo')
    })
  },
  submit() {
    this.data.postInfo.userAvatar = this.data.wxInfo.userAvatar;
    this.data.postInfo.userOpenid = wx.getStorageSync('openid');
    this.data.postInfo.userBirthday = this.data.postInfo.userBirthday + " 00:00:00";
    // console.log(this.isGrant)
    if(this.data.isGrant) {
      myModel.updateMyInfo(this.data.postInfo, (res) => {
        console.log(res)
        if(res.code == 500) {
          wx.showToast({
            title: res.message,
            icon: "none"
          })
        } else {
          wx.showToast({
            title: res.message,
          })
          wx.reLaunch({
            url: '../../index/index',
          })
        }
      })
    } else {
      myModel.postMyInfo(this.data.postInfo, (res) => {
        console.log(res)
        if(res.code == 500) {
          wx.showToast({
            title: res.message,
            icon: "none"
          })
        } else {
          wx.setStorageSync('isGrant', true);
          wx.setStorageSync('token', res.data.token);
          wx.showToast({
            title: res.message,
          })
          wx.reLaunch({
            url: '../../index/index',
          })
        }
      })
    } 
  },
  twoSubmit() {
    this.data.postInfo.userAvatar = this.data.wxInfo.userAvatar;
    this.data.postInfo.userOpenid = wx.getStorageSync('userInfo').userOpenid;
    this.data.postInfo.userBirthday = this.data.postInfo.userBirthday + " 00:00:00";
    console.log(this.data.postInfo)
    
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