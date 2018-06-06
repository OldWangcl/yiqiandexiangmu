//app.js
// var dataObj = require('data/data.js');
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var storageData = wx.getStorageSync('postList');
    // if (!storageData){
    //   var dataObj = require('data/data.js');
    //   wx.clearStorageSync();
    //   wx.setStorageSync('postList', dataObj.postList);
    // }

    

    // 登录
    wx.login({
      success: res => {
        // console.log(res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'https://295u.cn/api/XcxGetTest.html', //仅为示例，并非真实的接口地址        
          // url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: 'wxe2b9a6c3f7150e24',
            secret: '42299b6efd92a8fb98f026831d30344d',
            js_code: res.code,
            grant_type: 'authorization_code'
          },

          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (resx) {
            var aa = resx.data.split('oaHTaGaVmmhlnmg=');
            wx.setStorageSync('openid', JSON.parse(aa[1]).openid);
            var appid = "wxe2b9a6c3f7150e24";
            wx.setStorageSync('appid', appid);
            // console.log(334);
            // console.log(wx.getStorageSync('appid'));
          },
          
        })
        
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow: function (e) {
    if (e.scene === 1007 && e.query.fopenid){
      wx.setStorageSync('fopenid', e.query.fopenid);
    }else{
      wx.setStorageSync('fopenid', wx.getStorageSync('openid'));
    }
    // console.log(e);
    // console.log(e.scene);
    // console.log(e.query.fopenid);
  },
  globalData: {
    userInfo: null
  }
})