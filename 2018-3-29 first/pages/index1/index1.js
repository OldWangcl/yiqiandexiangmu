// pages/index1/index1.js
var dataObj =require('../../data/data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots:true,
    interval:5000,
    autoplay:true,
    circular:true,
    imagerUsers:[
      '/images/index1/index1-01.jpg',
      '/images/index1/index1-02.jpg',
      '/images/index1/index1-03.jpg',
      '/images/index1/index1-04.jpg',
      '/images/index1/index1-05.jpg',
      '/images/house/house-01.jpg',
      '/images/house/pig-01.jpg',
      '/images/house/ji-01.jpg',
    ]
},
//监听用户下拉刷新
  // onPullDownRefresh:function(res){
  //   wx.startPullDownRefresh({
      
  //     success: function (res) {
  //         console.log("1")
  //     },
  //     fail: function (res){
  //       console.log("0")
  //     },complete:function(){
  //       console.log("2")
  //     }
      
  //   })
  //   wx.showToast({
  //     title: '刷新中',
  //   })
    
  // },
  onTapList: function (e) {
    //设置图片传递参数
    var postId = e.currentTarget.dataset.postId;
    //设置canvas定位横坐标
    var xid = e.currentTarget.dataset.xid;
    var styleid = e.currentTarget.dataset.styleid;
    console.log(e.currentTarget.dataset.styleid)
    //设置文字大小
    var sizeid = e.currentTarget.dataset.sizeid;
    // console.log(e.currentTarget.dataset.sizeid)
    //设置canvas定位纵坐标
    var yid = e.currentTarget.dataset.yid;
    //设置宽度参数
    var widthid = e.currentTarget.dataset.widthid;
    //设置高度参数
    var heightid = e.currentTarget.dataset.heightid;
    // console.log(1)
    // console.log(e.currentTarget.dataset.heightid);
    //获取二维码横坐标参数
    var qrxid = e.currentTarget.dataset.qrxid;
    // console.log(e.currentTarget.dataset.qrxid);
    //获取二维码纵坐标参数
    var qryid = e.currentTarget.dataset.qryid;
    // console.log(e.currentTarget.dataset.qryid);
    //获取二维码宽度坐标参数
    var qrwid = e.currentTarget.dataset.qrwid;
    // console.log(e.currentTarget.dataset.qrwid);
    //获取二维码高度坐标参数
    var qrhid = e.currentTarget.dataset.qrhid;
    // console.log(e.currentTarget.dataset.qrhid);

    // console.log(yid)
    // console.log(e);
    // console.log(1);
    // console.log(postId);
    // console.log(e.currentTarget.dataset.productid);
    wx.navigateTo({
      url: '../list/list?id=' + postId + '&x=' + xid + '&y=' + yid + '&size=' + sizeid + '&width=' + widthid + '&height=' + heightid + '&style=' + styleid + '&qrx=' + qrxid + '&qry=' + qryid + '&qrw=' + qrwid + '&qrh=' + qrhid
    })
    console.log('../list/list?id=' + postId + '&x=' + xid + '&y=' + yid + '&size=' + sizeid + '&width=' + widthid + '&height=' + heightid + '&style=' + styleid + '&qrx=' + qrxid + '&qry=' + qryid + '&qrw=' + qrwid + '&qrh=' + qrhid);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      postList:dataObj.postList
    })
    //获取生成二维码传递的值
    var scene = decodeURIComponent(options.scene)
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
  onHIde: function () {
  
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
  
  },
  //用户点击事件
 
})