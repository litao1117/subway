// pages/function/leader/check-list/check-list.js
import {controlModel} from "../../../../model/control"
const controlmodel = new controlModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    record: [
      {
        id: '',
        oddNumber: '',
        deviceName: '',
        des: '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
        level: '',
      },
      {
        id: '',
        oddNumber: '',
        deviceName: '',
        des: '啊啊啊啊啊啊啊啊啊啊啊',
        level: '',
      }
    ],
    pageNumber: 1,
    showLoading: false,
  },
  jumptoCheck: function(e) {
    var id = e.currentTarget.dataset.id;
    console.log(id);
    var url = `../repair-check/repair-check?id=${id}`
    wx.navigateTo({
      url: url,
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _that = this;
    let data = {
      current: _that.data.pageNumber,
      limit: 5,
      count: 180
    }
    controlmodel.findRepaired(data, (res) => {
      console.log(res)
      if(res.code === 200) {
        for(let item of res.data.list) 
          item.createTime = new Date(item.createTime).toLocaleString();
        this.setData({
          record: res.data.list
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