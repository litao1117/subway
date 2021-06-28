// pages/grant/grant.js
import { faultModel } from "../../../model/fault"
let faultmodel = new faultModel();
import {getFormDataParams} from '../../../model/aliOss'
import uuid from '../../../utils/uuid';
const key = `${new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate()}/`;
const ossurl = "https://zhang-xiaolan.oss-cn-beijing.aliyuncs.com";
const util = require("../../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    faultPicture : [],
    pic : [],
    chooseViewShow: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
        var imgArrNow = _that.data.pic;
        imgArrNow = imgArrNow.concat(res.tempFilePaths);
        _that.setData({
          pic: imgArrNow
        })
        _that.imgToOss(_that.data.pic, 0, 0, 0, _that.data.pic.length);
        _that.chooseViewShow();
      }
    })
  },
  // 图片预览
  photo_preview: function(e) {
    let _that = this;
    var imgArr = _that.data.pic;
    var index = e.currentTarget.dataset.id;
    console.log(index)
    wx.previewImage({
      current: imgArr[index],
      urls: _that.data.pic,
    })
  },
   /** 是否隐藏图片选择 */
   chooseViewShow: function () {
    if (this.data.pic.length >= 9) {
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
      var imgArr = this.data.pic;
      var itemIndex = e.currentTarget.dataset.id;
      imgArr.splice(itemIndex, 1);
      this.setData({
        pic: imgArr
      })
      //判断是否隐藏选择图片
      this.chooseViewShow();
  },
  // 获取上传文件数据
  getUploadInfo() {

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
              var faultPicture = _that.data.faultPicture;
              var imgUrl = ossurl + '/' + formData.key;
              faultPicture.push(imgUrl);
              _that.setData({
                faultPicture: faultPicture
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
    let _that = this;
    let fault = e.detail.value;
    let token = wx.getStorageSync('token');
    fault.faultPicture = _that.data.faultPicture.join(",");
    console.log('form发生了submit事件，携带数据为：', fault);
    if(!e.detail.value.faultPlace) {
      wx.showToast({
        title: '请填写故障地点',
        icon: 'none'
      })
    } else
    if(!e.detail.value.faultEquipment) {
      wx.showToast({
        title: '请填写故障设备',
        icon: 'none'
      })
    } else
    if(!e.detail.value.faultDescribe) {
      wx.showToast({
        title: '请填写故障描述',
        icon: 'none'
      })
    } else
    if(!_that.data.faultPicture.length) {
      wx.showToast({
        title: '请上传图片',
        icon: 'none'
      })
    } else {
      faultmodel.faultAdd(fault, (res) => {
        console.log(res);
        if(res.code ===  200) {
          wx.showToast({
            title: '上报成功',
          })
          wx.navigateBack({
            delta: 1,
          })
        } else {
          wx.showToast({
            title: res.message,
            icon: "none",
          })
        }
      })
    }}, 3000),
  
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