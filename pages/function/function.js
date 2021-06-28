// pages/function/function.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxInfo: {},
    userInfo: {},
    currentArr: [],
    funcRepairArr: [
      {
        name: "维修报备",
        icon: '../../images/flag_fill.png',
        url: './repair/repair-report/repair-report'
      },
      {
        name: "维修记录",
        icon: '../../images/businesscard_fill.png',
        url: './repair/repair-record/repair-record'
      }
    ],
    funcCheckArr: [
      {
        name: "故障上报",
        icon: '../../images/weixiu2.png',
        url: './fault/fault'
      },
      {
        name: "故障记录",
        icon: '../../images/businesscard_fill.png',
        url: './repair/repair-record/repair-record'
      },
    ],
    funcSendArr: [
      {
        name: "故障列表",
        icon: '../../images/weixiu2.png',
        url: '../function/control/fault-infoList/fault-infoList'
      },
      {
        name: "维修记录",
        icon: '../../images/businesscard_fill.png',
        url: '../function/repair/repair-record/repair-record'
      },
    ],
    funcLeaderArr: [
      {
        name: "维修审查",
        icon: '../../images/flag_fill.png',
        url: './leader/check-list/check-list'
      },
      {
        name: "维修记录",
        icon: '../../images/businesscard_fill.png',
        url: '../function/repair/repair-record/repair-record'
      },
    ],
    visible2: false,
    visible1: false,
    id: "2",  // 123:巡检456维修789接报10
  },
  // tabbar切换函数
  handleChange({detail}) {
      if(detail.key == 1) {
        wx.reLaunch({
          url: '../index/index',
        })
      } else if(detail.key == 3) {
        wx.reLaunch({
          url: '../mine/mine',
        })
      }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let wxInfo = wx.getStorageSync('wxInfo');
    this.setData({
      wxInfo: wxInfo,
      userInfo: wx.getStorageSync('userInfo'),
      id: wx.getStorageSync('userInfo').userLevel
    })
    switch(this.data.id) {
      case "1":
      case "2":
        this.setData({
          currentArr: this.data.funcCheckArr
        });
        break;
      case "4":
      case "5":
        this.setData({
          currentArr: this.data.funcRepairArr
        });
        break;
      case "7":
      case "8":
        this.setData({
          currentArr: this.data.funcSendArr
        });
        break;
      case "3":
      case "6":
      case "9":
      case "10":
        this.setData({
          currentArr: this.data.funcLeaderArr
        });
        break;
      default:
        this.setData({
          currentArr: []
        });
        break;
    }
  },
  handleOk() {
    this.setData({
      visible2: false
    })
    wx.reLaunch({
      url: '../mine/mine',
    })
  },
  handleClose() {
    this.setData({
      visible2: false
    })
    wx.reLaunch({
      url: '../index/index',
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
  //  监听底部tab栏变化
  onTabItemTap(e){
    if(wx.getStorageSync('islogin')) {
      this.setData({
        visible2: false
      })
    } else if(!wx.getStorageSync('islogin')){
      this.setData({
        visible2: true
      })
    } else if(wx.getStorageSync('isGrant')) {
      this.setData({
        visible1: false
      })
    } else {
      this.setData({
        visible1: true
      })
    }
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