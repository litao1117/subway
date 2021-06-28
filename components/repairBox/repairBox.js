// components/repairBox/repairBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    info: {
      type: Object,
      value: {
        oddNumber:'123',
        deviceName: '',
        des: '',
        level: '',
        locate: ''
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    jumptoCheck: function(e) {
      var id = e.currentTarget.dataset.id;
      console.log(id);
      var url = `../../pages/function/leader/epair-check/repair-check?id=${id}`
      wx.navigateTo({
        url: url,
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
        }
      })
    },
  }
})
