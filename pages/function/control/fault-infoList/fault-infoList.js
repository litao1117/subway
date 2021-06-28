// pages/function/fault/fault-infoList/fault-infoList.js
import {controlModel} from "../../../../model/control";
let controlmodel = new controlModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    faultInfoList: [
      {

      }
    ],
    showLoading : false,
    pageNumber: 1,
    // timeCount: 5
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _that = this;
    let data = {
      current: _that.data.pageNumber,
      limit: 5,
      count: 180
    }
    controlmodel.unRepairList(data, (res) => {
      console.log(res)
      if(res.code === 200) {
        for(let item of res.data.list) 
          item.createTime = new Date(item.createTime).toLocaleString();
        this.setData({
          faultInfoList: res.data.list
        })
        if(res.data.list.length == 0) {
          _that.setData({
            showLoading: true
          })
        }
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
    }) 
  },
  jumptoDetail(e) {
    var id = e.currentTarget.dataset.id;
    console.log(e)
    wx.navigateTo({
      url: `../fault-detail/fault-detail?id=${id}`,
      success: (res) => {
        res.eventChannel.emit('acceptDataFromOpenerPage', { data:  this.data.faultInfoList[id]})
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