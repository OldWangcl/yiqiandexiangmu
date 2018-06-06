// pages/share/share.js
// var imageUrl = 'imagePath'//图片的链接
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath: '',
    title:''
    
  },
  // getTempFilePath: function () {
  //   wx.canvasToTempFilePath({
  //     canvasId: 'share',
  //     success: (res) => {
  //       this.setData({
  //         shareTempFilePath: res.tempFilePath
  //       })
  //     }
  //   })
  // },
  // 保存图片到本地
  bindSaveTap: function (){
    /*直接调用图片 */
    wx.getImageInfo({
      src: this.data.imagePath, //图片路径
      success: function (res) {
        console.log(res.path)
        wx.saveImageToPhotosAlbum({
          filePath: res.path,
          success:function(res) {
          // console.log(1);
          console.log(res);
          wx.showModal({
            title: '提示',
            content: '保存成功，分享到朋友圈秀一下吧',
            showCancel:false,
            success:function(res){
              if(res.confirm){
                console.log("用户点击确定");
              }else{
                console.log("用户点击取消");
              }
            }
          })           
        },
         fail:function(res){
         console.log('fail');
         console.log(res);
         //保存失败弹窗提醒
         wx.showToast({
           title: '保存失败',
         })
         wx.openSetting({
           success: (res) => {
               res.authSetting = {
                 "scope.writePhotosAlbum": true,
            }  
           }
         })
        } 
      })
      }
    })  
  },
  bindImgTap:function(){
    wx.previewImage({
      current: this.data.imagePath, // 当前显示图片的http链接
      urls: [this.data.imagePath] // 需要预览的图片http链接列表
    })
    console.log(this.current); 
  },

  // 分享图片给朋友
  bindShareTap:function(){
    this.onShareAppMessage()
  },
  onShareAppMessage:function(res){
    return{
      title:'恶搞神器',
      desc: '恶搞神器分享!' ,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }   
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取
    this.setData({
      imagePath: options.Input
      // title:options.Input
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