// components/myInfo/myInfo.js
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
    inputValue: {
      type: String,
      value: ''
    },
    tishi: {
      type: String,
      value: ''
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
    changeValue: function(e) {
      this.setData({
        inputValue: e.detail.value
      })
    },
    modalinput: function(e) {
      let that = this;
      that.setData({
        hiddenmodalput: !that.data.hiddenmodalput,
        value_nature: e.currentTarget.dataset.nature,
        inputValue: that.data.value
      })
    },
    confirm: function(e) {
      let that = this;
      let str = that.data.value_nature;
      // 判断
      if(str != 'userBirthday') {
        if (that.data.inputValue.length === 0) {
          wx.showToast({
            title: '该选项不能为空',
            icon: "none",
            duration: 2000
          })
        } else {
          if(str === 'userTel') {
            if(this.isPoneAvailable(that.data.inputValue)) {
              that.setData({
                hiddenmodalput: true,
                value: that.data.inputValue,
              })
              var myEventDetail = {
                nature: str,
                value: that.data.value
              } // detail对象，提供给事件监听函数
              var myEventOption = {} // 触发事件的选项
              this.triggerEvent('change', myEventDetail, myEventOption)
            } else {
              wx.showToast({
                title: '电话格式错误',
                icon: "none",
                duration: 2000
              })
            }
          } else if(str === 'userName') {
            if(that.isname(that.data.inputValue)) {
              that.setData({
                hiddenmodalput: true,
                value: that.data.inputValue,
              })
              var myEventDetail = {
                nature: str,
                value: that.data.value
              } // detail对象，提供给事件监听函数
              var myEventOption = {} // 触发事件的选项
              this.triggerEvent('change', myEventDetail, myEventOption)
            } else {
              wx.showToast({
                title: '请填写正确的姓名',
                icon: "none",
                duration: 2000
              })
            }
          } else if(str === 'invitationCode') {
            that.setData({
              hiddenmodalput: true,
              value: that.data.inputValue,
            })
            var myEventDetail = {
              nature: str,
              value: that.data.value
            } // detail对象，提供给事件监听函数
            var myEventOption = {} // 触发事件的选项
            this.triggerEvent('change', myEventDetail, myEventOption)
          }
        }
      } else if(str === 'userBirthday') {
        that.setData({
          hiddenmodalput: true,
          value: that.data.inputValue,
        })
        var myEventDetail = {
          nature: str,
          value: that.data.value
        } // detail对象，提供给事件监听函数
        var myEventOption = {} // 触发事件的选项
        this.triggerEvent('change', myEventDetail, myEventOption)
      }
      
    },
    cancel() {
      let that = this;
      that.setData({
        hiddenmodalput: true,
        value: this.data.value,
        inputValue: this.data.value
      })
    },
    isPoneAvailable: function (pone) {
      var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (!myreg.test(pone)) {
        return false;
      } else {
        return true;
      }
    },
    isname : function(name){
      let reg = /^[\u4e00-\u9fa5]{0,10}$/;
      if (!reg.test(name)) {
        return false;
      } else {
        return true;
      }
    },
  }
})
