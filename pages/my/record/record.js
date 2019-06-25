Page({
  data: {
    userid:0,
    recordlist:[],
    currentPage: 1,
    pageSize: 10,
  },
  onLoad:function(option){
    var that = this;
    var recordlist = that.data;
    //请求交易记录数据
    wx.getStorage({
      key: 'userId',
      success(e){
        that.setData({
          userid: e.data.user_id
        })
        // 请求方法
        wx.request({
          url: 'http://39.106.203.202:18080/v1/open/task/findDeal/' + that.data.userid,
          method: "GET",
          success(e) {
            console.log("交易记录数据")
            console.log(e)
            that.setData({
              recordlist: e.data
            })
            // 控制完成任务的钱和发布任务的钱所显示的颜色
            for (var index in that.data.recordlist) {
              if (that.data.recordlist[index].sum > 0) {
                // 大于0时字体变为红色
                that.data.recordlist[index].show = true;
                console.log(that.data.recordlist)
                that.setData({
                  recordlist: that.data.recordlist
                })
                console.log(recordlist)
              } else {
                // 小于0时字体变为黑色
                that.data.recordlist[index].show = false;
                that.setData({
                  recordlist: that.data.recordlist
                })
              }
            }
          }
        })
      }
    })
  },
  // 下拉刷新
  onPullDownRefresh: function (res) {
    var that = this;
    var ao = {
      currentPage: 1,
      pageSize: 10,
      userId: that.data.userid
    }
    wx.request({
      url: 'http://39.106.203.202:18080/v1/open/task/findDealByUserIdPage',
      data: ao,
      method: "POST",
      header: { //头部返回信息
        'content-type': 'application/json'
      },
      success: function (e) {
        wx.showToast({
          title: '下拉刷新',
          icon: 'loading'
        })
        console.log(e);
      }
    })
  },
// 上拉事件
  onReachBottom: function (res) {
    var that=this;
    var ao = {
      currentPage: 1,
      pageSize: 10,
      userId: that.data.userid
    }
    wx.request({
      url: 'http://39.106.203.202:18080/v1/open/task/findDealByUserIdPage',
      data: ao,
      method:"POST",
      header: { //头部返回信息
        'content-type': 'application/json'
      },
      success:function(e){
        wx.showToast({
          title: '加载中',
          icon: 'loading'
        })
        console.log(e);
      }
    })
  }
})