//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '抢',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    user_code: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function(e) {
    console.log(e);
    app.globalData.task_id = e.task_id
    var that = this
    wx.login({
      //获取code
      success: function(res) { //获取code值
        that.setData({
          user_code: res.code
        })
        console.log(res.code);
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  jump() {
    var that = this
    console.log(app.globalData.userInfo);
    console.log(that.data.user_code);
    console.log(app.globalData.userInfo.nickname);
    wx: wx.request({
      url: 'http://39.106.203.202:18080/v1/open/task/',
      data: {
        code: that.data.user_code,
        head_portrait: app.globalData.userInfo.avatarUrl,
        nickname: app.globalData.userInfo.nickName,
      },
      header: {},
      method: 'POST',
      dataType: 'json',
      success: function(res) {
      app.globalData.user_id = res.data.user_id
        console.log(app.globalData.user_id)
        wx.redirectTo({
          url: '../participant/participant'
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})