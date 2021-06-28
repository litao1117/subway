// components/myPicker/myPicker.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isMust: {
      type: Boolean,
      value: true
    },
    flag: {
      type: Boolean,
      value: false
    },
    // 是否隐藏
    hiddenmodalput: {
      type: Boolean,
      value: true
    },
    nature_name: {
      type: String,
      value: ''
    },
    nature: {
      type: String,
      value: '属性'
    },
    value: {
      type: String,
      value: '信息'
    },
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

  }
})
