// index.js
import {
  indexModel
} from '../../model/index.js';
let indexMol = new indexModel();
// 获取应用实例
const app = getApp()

Page({
  data: {
    // 轮播图数据
    img: [
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0405%252F0f7f2022j00qr1u7f000yd200fr006tg00fr006t.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621069822&t=47ff096fcb7e50605dc1acefae24cbeb',
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.bigaovi.com%2Fuploadfiles%2F201803%2F20180313175151295129.jpg&refer=http%3A%2F%2Fwww.bigaovi.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621069844&t=f54f283186daedadd9ed96019117f3bb',
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.logoaplus.com%2Fuploads%2Fimage%2F20180513%2F21%2F0b05a3c326aec431b93fbeb76b9cdc91.png&refer=http%3A%2F%2Fwww.logoaplus.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621069862&t=3a8a5e9c1c3062349f9b938f6cf92e77'
    ],
    indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      circular: true,
    // 通告栏数据
    noticeBar1: '1号线一期：2019年年底开工——预计2024年年底投入使用。',
    noticeBar2: '磁浮Z3号线：预计2020年开工——预计2023年初投入使用。',
    infomation: '太原市城市轨道交通二期建设规划（2021—2026年）由1号线一期东延工程、2号线二期工程、3号线一期工程、R3号线共4条线路组成，全长55.46km，其中地下线36.46km，高架线19km。共设35座车站，其中1座为换乘车站。设车辆段2座，停车场1座。'
  },

  onLoad(options) {
    let that = this;
    if(wx.getStorageSync('islogin')) {
      console.log("login")
      wx.login({
        success: res => { 
          console.log(res.code)
          if(res.code) {
            let code = {
              code: res.code
            }
            indexMol.ifStartUp(code, (res) => {
              console.log(res);
              if(res.code == 300) {
                wx.setStorageSync('openid', res.data.openId);
                wx.reLaunch({
                  url: '../mine/mine-info/mine-info',
                })
              } else if(res.code == 500) {
                wx.showToast({
                  title: res.message,
                  icon: 'none'
                })
              } else {
                wx.setStorageSync('isGrant', true);
                wx.setStorageSync('token', res.data.token);
                res.data.user.userBirthday = res.data.user.userBirthday.split(' ')[0];
                wx.setStorageSync('userInfo', res.data.user);
                // wx.reLaunch({
                //   url: '../index/index',
                // })
              }
            })
          }
        }
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  goToInfomation() {
    wx.navigateTo({
      url: './infomation/infomation',
    })
  }
})
