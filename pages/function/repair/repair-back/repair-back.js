// pages/function/fault/fault-info/fault-info.js
const util = require("../../../../utils/util");
import {repairModel} from "../../../../model/repiar"
const repairmodel = new repairModel();
import {getFormDataParams} from '../../../../model/aliOss'
import uuid from '../../../../utils/uuid';
const key = `${new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate()}/`;
const ossurl = "https://zhang-xiaolan.oss-cn-beijing.aliyuncs.com";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    levelArray: ['一级','二级','三级','四级','五级','六级','七级','八级','九级','十级'],
    repairLevel: '',
    photo_src : [],
    chooseViewShow: true,
    faultInfo: {},
    repairPicture: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    let _that = this;
    const eventChannel = this.getOpenerEventChannel()
    // eventChannel.emit('acceptDataFromOpenedPage', {data: 'test'});
    // eventChannel.emit('someEvent', {data: 'test'});
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log(data)
      _that.setData({
        faultInfo: data
      })
    })
  },
  bindPickerChange: function(e) {
    console.log(e)
    this.setData({
      "repairLevel": this.data.levelArray[e.detail.value]
    })
  },
  // 选择图片
  chose_photo() {
    let _that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log(res.tempFilePaths)  
        if (res.tempFilePaths.count == 0) {
          return;
        }            
        var imgArrNow = _that.data.photo_src;
        imgArrNow = imgArrNow.concat(res.tempFilePaths);
        _that.setData({
          photo_src: imgArrNow
        })
        _that.imgToOss(_that.data.photo_src, 0, 0, 0, _that.data.photo_src.length);
        _that.chooseViewShow();
      }
    })
  },
  // 图片预览
  photo_preview: function(e) {
    let _that = this;
    var imgArr = _that.data.photo_src;
    var index = e.currentTarget.dataset.id;
    console.log(index)
    wx.previewImage({
      current: imgArr[index],
      urls: _that.data.photo_src,
    })
  },
   /** 是否隐藏图片选择 */
   chooseViewShow: function () {
    if (this.data.photo_src.length >= 9) {
      this.setData({
        chooseViewShow: false
      })
    } else {
      this.setData({
        chooseViewShow: true
      })
    }
  },
    /** 删除图片 */
  deleteImv: function (e) {
      var imgArr = this.data.photo_src;
      var itemIndex = e.currentTarget.dataset.id;
      imgArr.splice(itemIndex, 1);
      this.setData({
        photo_src: imgArr
      })
      //判断是否隐藏选择图片
      this.chooseViewShow();
  },
    // 图片上传至oss
    imgToOss(imgArr, i, successUp, failUp, length) {
      let _that = this;
      let flag = 0;
      let arr = [];
      let extendName = imgArr[i].split(".")[1];
      getFormDataParams().then(res => {
        let formData = res;
        console.log(formData)
        formData.key = `${key}${uuid.uuid()}.${extendName}`;
          wx.uploadFile({
            filePath: imgArr[i],
            name: 'file',
            url: ossurl,
            formData:formData,
            success: (res) => {
              successUp++;
              console.log(res)
              if(res.statusCode === 204) {
                console.log("上传成功")
                var repairPicture = _that.data.repairPicture;
                var imgUrl = ossurl + '/' + formData.key;
                repairPicture.push(imgUrl);
                _that.setData({
                  repairPicture: repairPicture
                })
              }
            },
            fail: err => {
              failUp++;
              console.log(err);
            },
            complete() {
              i++;
              if(i == length) {
                return;
              } else {
                _that.imgToOss(imgArr, i, successUp, failUp, length)
              }
            }
          })
      });
    },
  // 表单提交
  formSubmit: util.throttle(function (e) {
    let repair_data = e.detail.value;
    repair_data.repairPicture = this.data.repairPicture.join(",");
    repair_data.repairLevel = this.data.levelArray.indexOf(this.data.repairLevel)+1;
    repair_data.repairFaultId = this.data.faultInfo.data.faultId;
    repair_data.repairUserId = wx.getStorageSync("userInfo").userOpenid;
    console.log('form发生了submit事件，携带数据为：', repair_data);
    if(!e.detail.value.repairDescribe) {
      wx.showToast({
        title: '请填写处理结果',
        icon: 'none'
      })
    } else if(!this.data.repairLevel) {
      wx.showToast({
        title: '请填写故障等级',
        icon: 'none'
      })
    } else if(!this.data.photo_src.length) {
      wx.showToast({
        title: '请上传图片',
        icon: 'none'
      })
    } else {
      repairmodel.addRepair(repair_data, (res) => {
        if(res.code === 200) {
          wx.showToast({
            title: '提交成功',
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
    }
  }, 3000),
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