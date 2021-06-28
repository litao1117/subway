// pages/function/leader/repair-check/repair-check.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    record: {
        oddNumber: '',
        deviceName: '',
        des: '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
        level: '',
        checkName: '',
        solveName: '',
        img: ["../../../../images/delect.png",
        "../../../../images/help.png"
        ]
      },
      listData:[
        {"code":"01","text":"text1text1text1text1text1text1text1text1text1text1text1text1text1text1text1text1","type":"type1"},
        {"code":"02","text":"text2","type":"type2"},
        {"code":"03","text":"text3","type":"type3"},
      ],
      starIndex2: 0,
  },
  // 图片预览
  photo_preview: function(e) {
    let _that = this;
    var imgArr = _that.data.record.img;
    var index = e.currentTarget.dataset.id;
    console.log(index)
    wx.previewImage({
      current: imgArr[index],
      urls: _that.data.record.img,
      success(res) {
        console.log(res)
      },
      fail(e) {
        console.log(e)
      }
    })
  },
  onChange2(e){
    const index = e.detail.index;
    this.setData({
        'starIndex2' : index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.query)
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', {data: 'test'});
    eventChannel.emit('someEvent', {data: 'test'});
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log(data)
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