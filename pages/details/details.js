// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    windowWidth:"",
    windowHeight:"",
    text:"通过",
    textNo:"未通过",
    result:"",
    taskContent:"最多显示十五个字，显示十五个字",
    hint:true,  //显示审核按钮
    resultDisplay:false,//显示审核是否通过
    display:false,//控制模态窗的显示
    header: "https://wx.qlogo.cn/mmopen/vi_32/XXhmfBm43pXVadqR3q4iah1WooPJFJsFFvibKQQ1IyHS2aJM9Khn3ED84B0xKL7onHCgK1bS9PbwGJlgKy1qEGkQ/132"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: getApp().globalData.userInfo,
      windowWidth:wx.getSystemInfoSync().windowWidth,
      windowHeight:wx.getSystemInfoSync().windowHeight
    })
    console.log("打印当前登录用户的信息")
    console.log(this.data.userInfo)
  },
  hint:function(){
    this.setData({
      display:true
    })
  },
  close:function(e){
    console.log(e)
    console.log(e.currentTarget.dataset.text)
    this.setData({
      display: false,
      hint:false,
      result: e.currentTarget.dataset.text,
      resultDisplay:true
    })
  },
  TaskContent:function(e){
  //  var taskContent = e.currentTarget.dataset.text
  //  console.log(taskContent)
    wx.navigateTo({
      url: '/pages/taskContent/content?text=' + this.data.taskContent + "&header=" + this.data.header,
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