// pages/mine/mine.js
import {
  mineModel
} from '../../model/mine'
let myInfo = new mineModel();
const faultId = '_x38eq_m_iOTEQHYFNe5ItSXVfuhOMFCmz6itihnVlQ';
const processId = 'oYPlXNoJ5SFL2-spLJaNb8j2gJDVOsaUJvFsUU5blY8';
const refuseId = 'kxa-qSFVG1VzbfhcqSdzNZjIU8XDHa3MbsB72UzwBTw';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHide:false,
    wxInfo: {},
    userInfo: {},
    code: "",
    man:"../../images/man.png",
    women:"../../images/women.png",
    visible2: false,
    position: ""
  },
  doitcode() {
    wx.requestSubscribeMessage({
      tmplIds: ['_x38eq_m_iOTEQHYFNe5ItSXVfuhOMFCmz6itihnVlQ', 'oYPlXNoJ5SFL2-spLJaNb8j2gJDVOsaUJvFsUU5blY8', 'kxa-qSFVG1VzbfhcqSdzNZjIU8XDHa3MbsB72UzwBTw'],
      success: (res)=> {
        console.log(res); 
        if(res[faultId] === "accept") {
            for(let i = 0; i < 100; i++) {
              wx.requestSubscribeMessage({
                tmplIds: ['_x38eq_m_iOTEQHYFNe5ItSXVfuhOMFCmz6itihnVlQ', 'oYPlXNoJ5SFL2-spLJaNb8j2gJDVOsaUJvFsUU5blY8', 'kxa-qSFVG1VzbfhcqSdzNZjIU8XDHa3MbsB72UzwBTw'],
                success: (res)=> {},
                fail: () => {}
              })
            }
          wx.reLaunch({
            url: '../startup/startup',
          })
        }
      },
      fail: () => {

      }
    })
  },
  jumpToInfo() {
    if(wx.getStorageSync('islogin')) {
      wx.navigateTo({
        url: './mine-info/mine-info',
      })
    } else {
      this.setData({
        visible2: true
      })
    }
  },
  loginOut() {
    wx.setStorageSync('islogin', false);
    wx.setStorageSync('authorization', false);
    this.onLoad();
  },
  handleOk() {
    this.setData({
      visible2: false
    })
  },
  handleClose() {
    this.setData({
      visible2: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let stat = wx.getStorageSync('authorization');
    let islogin = wx.getStorageSync('islogin');
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({
      isHide: stat==true && islogin == true,
      userInfo: userInfo,
      wxInfo: wx.getStorageSync('wxInfo')
    })
    switch(wx.getStorageSync('userInfo').userLevel) {
      case "1":
      case "2":
        this.setData({
          position: "检修员"
        });
        break;
      case "4":
      case "5":
        this.setData({
          position: "维修员"
        });
        break;
      case "7":
      case "8":
        this.setData({
          position: "调度员"
        });
        break;
      case "3":
      case "6":
      case "9":
      case "10":
        this.setData({
          position: "领导"
        });
        break;
      default:
        this.setData({
          position: "无职位"
        });
        break;
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