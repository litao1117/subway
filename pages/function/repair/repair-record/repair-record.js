// pages/function/repair/repair-record.js
import {faultModel} from "../../../../model/fault";
let faultmodel = new faultModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    record: [
     {
        controlUserName: null,
        createTime: "2021-05-28 19:09:00",
        faultControlUserId: null,
        faultDescribe: "b",
        faultEquipment: "b",
        faultInspectionUserId: "odHJH48SM_xr3QnXa-GNlGDNQYgs",
        faultPlace: null,
        faultRepairUserId: null,
        inspectionUserName: "李涛",
        repairUserName: null,
     }
    ],
    pageNumber: 1,
    current: 'tab1',
    showLoading: false,
    flag: true,
    options: [
      {
        id:7,
        name: "最近7天"
      },
      {
        id:15,
        name: "最近15天"
      },
      {
        id:30,
        name: "最近30天"
      },
    ],
    total: 1,
    timeCount: 100
  },
  handleChange ({ detail }) {
    var _that = this;
    _that.setData({
      flag: true,
      current: detail.key,
      showLoading: false,
      pageNumber: 1
    })
    var data = {
      current: _that.data.pageNumber,
      limit: 5,
      count: _that.data.timeCount
    }
    if(detail.key === "tab1") {
      faultmodel.unRepairList(data, (res) => {
        console.log(res)
        if(res.code === 200) {
          _that.setData({
            total: res.data.total,
            record: res.data.list
          })
          if(res.data.list.length < 5) {
            _that.setData({
              flag: false,
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
    } else if(detail.key === 'tab2') {
      faultmodel.findRepairing(data, (res) => {
        console.log(res)
        if(res.code === 200) {
          this.setData({
            total: res.data.total,
            record: res.data.list
          })
          if(res.data.list.length < 5) {
            _that.setData({
              flag: false,
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
    } else if(detail.key === 'tab3') {
      faultmodel.findRepaired(data, (res) => {
        console.log(res)
        if(res.code === 200) {
          this.setData({
            total: res.data.total,
            record: res.data.list
          })
          if(res.data.list.length < 5) {
            _that.setData({
              flag: false,
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
    }
  },
  jumptoProcess: function(e) {
    var _that = this;
    var id = e.currentTarget.dataset.id;
    var url = `./record-process/record-process?id=${id}`
    wx.navigateTo({
      url: url,
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: _that.data.record[id] })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _that = this;
    let data = {
      current: _that.data.pageNumber,
      limit: 5,
      count: _that.data.timeCount
    }
    faultmodel.unRepairList(data, (res) => {
      console.log(res)
      if(res.code === 200) {
        this.setData({
          total: res.data.total,
          record: res.data.list
        })
        if(res.data.list.length < 5) {
          _that.setData({
            flag: false,
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
  // 选择时间函数
  change(e) {
    var _that = this;
    _that.setData({
      timeCount: e.detail.id
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
  getRecordList() {
      setTimeout(() => {
        var that = this;
        that.setData({
          flag: false
        })
        let data = {};
        data.page = that.data.pageNumber;
        data.limit = 3;
        data.count = that.data.timeCount;
        let recordArr = []
        if(that.data.current === "tab1") {
          faultmodel.unRepairList(data, (res) => {
            console.log(res)
            if(res.code === 200) {
              recordArr = res.data.list;
            } else {
              wx.showToast({
                title: res.message,
                icon: 'none'
              })
            }
          }) 
        } else if(that.data.current === 'tab2') {
          faultmodel.findRepairing(data, (res) => {
            console.log(res)
            if(res.code === 200) {
              recordArr = res.data.list;
            } else {
              wx.showToast({
                title: res.message,
                icon: 'none'
              })
            }
          }) 
        } else if(that.data.current === 'tab3') {
          faultmodel.findRepaired(data, (res) => {
            console.log(res)
            if(res.code === 200) {
              recordArr = res.data.list;
            } else {
              wx.showToast({
                title: res.message,
                icon: 'none'
              })
            }
          }) 
        }
        if(recordArr.length == 0) {
          that.setData({
            flag: false,
            showLoading: true
          })
        } else {
          let newArr = that.data.record.concat(recordArr);
          that.setData({
            record: newArr,
            flag: true,
            showLoading: false
          })
        }
      }, 1000)
  
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    if(that.data.flag) {
      that.data.pageNumber++;
      that.getRecordList();
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})