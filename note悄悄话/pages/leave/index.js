// pages/leave/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postList: [],
    page: 1,
    pageSize: 20,
    keylist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://295u.cn/api/XcxNoteGet.html',
      data: {
        openid: wx.getStorageSync('openid'),
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data !== 'oaHTaGaVmmhlnmg='){
          var aa = res.data.split('oaHTaGaVmmhlnmg=');
          var arrs = JSON.parse(aa[1]);
          var reserve = arrs.reverse();
          that.setData({
            postList: reserve,
          })
        }
      },
    });
    wx.request({
      url: 'https://295u.cn/api/XcxKeysGet.html',
      data: {
        openid: wx.getStorageSync('openid'),
        appid: 'wxe2b9a6c3f7150e24'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data !== 'oaHTaGaVmmhlnmg=') {
          var aa = res.data.split('oaHTaGaVmmhlnmg=');
          var arrs = JSON.parse(aa[1]);
          console.log(arrs);
          wx.setNavigationBarTitle({
            title: arrs['key1']
          });
          that.setData({
            // postList: arrs,
            keylist: arrs
          })
          console.log(356);
          console.log(that.data.keylist);
        }
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

    wx.showNavigationBarLoading();
    console.log('加载更多')
    var that = this;
    wx.request({
      url: 'https://295u.cn/api/XcxNoteGet.html',
      data: {
        openid: wx.getStorageSync('openid')
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var totalpostList = []  //定义一个数组
        if (res.data !== 'oaHTaGaVmmhlnmg='){
          var aa = res.data.split('oaHTaGaVmmhlnmg='); //获取数据
          var arrs = JSON.parse(aa[1]); //字符串转换成数组
          var reserve = arrs.reverse();
          totalpostList = that.data.postList.concat(reserve); //两个数组相连
          that.setData({
            postList: totalpostList
          })
        }
      }
    })
    wx.hideNavigationBarLoading();
    setTimeout(function () {
      that.setData({
        isHideLoadMore: true,
      })
    }, 1000)


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})