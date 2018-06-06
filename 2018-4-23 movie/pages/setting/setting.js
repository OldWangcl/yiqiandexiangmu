// pages/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    device: [
      { iconurl: '/images/icon/icon-cellphone-01.png', title: '系统信息', tap: 'showSystemInfo' },
      { iconurl: '/images/icon/icon-location-01.png', title: '地图显示', tap: 'showMap' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.userInfo
        });
      },
      fail: function (res) {
        wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log("用户点击确定");
              // 弹出设置获取信息界面
              wx.openSetting({
                success: function (res) {
                  if (res.authSetting["scope.userInfo"]) {
                    wx.getUserInfo({
                      success: function (res) {
                        that.setData({
                          userInfo: res.userInfo
                        });
                      }
                    })
                  }
                },
                fail:function(res){
                  wx.getSetting({
                    success: (res) => {
                        res.authSetting = {
                          "scope.userInfo": true,
                          "scope.userLocation": true
                       } 
                    }
                  })
                }
              })
            }
          }
        })
        // console.log("获取信息失败" + error);
      }
    })
  },
  // 获取系统信息事件
  showSystemInfo:function(){
    wx.navigateTo({
      url: 'device/device'
    })
  },
  // 获取地图信息
  showMap:function(){
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      },
      fail:function(res){
        wx.showModal({
          title: '警告',
          content: '取消授权会影响地图使用效果哦~',
          success:function(res){
            wx.openSetting({
              success: (res) => {
                if (res.authSetting["scope.userLocation"] == true) {
                  console.log("调出设置界面")
                }
              }
            })
          }
        })
      }
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