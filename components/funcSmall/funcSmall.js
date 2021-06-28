// components/funcSmall/funcSmall.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    funcName: {
      type: String,
      value: ''
    },
    icon: {
      type: String,
      value: ''
    },
    url: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    jumpToUrl: ''
  },
  // lifetimes: {
  //   attached: function() {
  //     this.setData({
  //       jumpToUrl: 
  //     })
  //   } 
  // },
  /**
   * 组件的方法列表
   */
  methods: {
    jumpTo() {
      console.log(this.data.funcName)
      if(this.data.funcName == "故障记录") {
        wx.navigateTo({
          url: this.data.url,
          success: () => {
            wx.setNavigationBarTitle({
              title: '故障记录',
            })
          }
        })
      } else {
        wx.navigateTo({
          url: this.data.url,
        })
      }
      
    }
  }
})
