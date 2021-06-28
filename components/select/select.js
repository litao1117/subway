// components/select/select.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    options: {
      type: Array,
      value: []
    },
    defaultOption: {
      type: Object,
      value: {
        id: 3,
        name: '最近3天'
      }
    },
    key: {
      type: String,
      value: 'id'
    },
    text: {
      type: String,
      value: 'name'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
    current: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    optionTap(e) {
      let dataset = e.target.dataset;
      this.setData({
        current: dataset,
        isShow: false
      });
      // 调用父组件方法，并传参
      this.triggerEvent("change", { ...dataset })
    },
    openClose() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    // 此方法供父组件调用
    close() {
      this.setData({
        isShow: false
      })
    }
  },
  lifetimes: {
    attached() {
      this.setData({
        current: Object.assign({}, this.data.defaultOption)
      })
    }
  }
})
