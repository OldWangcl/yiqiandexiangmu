// pages/list/list.js
// var util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    // imagePath:'',
    placeholder:'请输入你的姓名',
    Input:'',
    imageUser:''
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取图片参数并调用
    this.setData({
      imageUser: options.id 
    })
    // console.log(1);
    // console.log(options.id);
    //获取图片横坐标
    this.setData({
      xid: options.x
    })
    // console.log(options.x);
    //获取图片纵坐标
    this.setData({
      yid: options.y
    })
    //获取图片文字大小
    this.setData({
      size: options.size
    })
    //获取图片宽度
    this.setData({
      width: options.width
    })
    //获取图片高度
    this.setData({
      height: options.height
    })
    //获取图片文字颜色
    this.setData({
      style: options.style
    })
    //获取二维码横坐标
    this.setData({
      qrx: options.qrx
    })
    //获取二维码纵坐标
    this.setData({
      qry: options.qry
    })
    //获取二维码宽度坐标
    this.setData({
      qrw: options.qrw
    })
    //获取二维码高度坐标
    this.setData({
      qrh: options.qrh
    })
    // console.log(1)
    // console.log(options.qrh)

    // 页面初始化 options为页面跳转所带来的参数
      this.createNewImg(); 
    // console.log(this.createNewImg());
    //创建初始化图片
  },
  /*点击图片预览 */
  // bindImgTap: function () {
  //   var img = this.data.imageUser;
  //   console.log(2222);
  //   console.log(this.data.imageUser)
  //   wx.previewImage({
  //     current: '',
  //     urls: [img]
  //   })
  //   console.log(1111);
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  //将金额绘制到canvas固定
  setInput:function(context){
    // console.log(1);
    // var money = util.toThousands(this.data.money);
    var Input = this.data.Input;
    var qrCode = "../../images/QRCode/qrcode.jpg" 
    // console.log(Input);
    //改变文字大小
    context.setFontSize(this.data.size);
    //改变文字颜色
    context.setFillStyle(this.data.style);
    context.fillText(Input, this.data.xid, this.data.yid);
    context.drawImage(qrCode, parseFloat(this.data.qrx), parseFloat(this.data.qry), parseFloat(this.data.qrw), parseFloat(this.data.qrh));
    // console.log(qrCode, parseFloat(this.data.qrx), parseFloat(this.data.qry), parseFloat(this.data.qrw), parseFloat(this.data.qrh));
    // context.drawImage(qrCode, 540, 530, 100, 55);
    context.stroke();
    // console.log(666)
    // console.log(Input, this.data.xid, this.data.yid);
  },
  //在页面中显示图片
  createNewImg:function(){
    var that = this;
    var path = this.data.imageUser;  //获取index1的图片
    // console.log('wwww');
    // console.log(this.data.imageUser)
    // console.log(9)
    var context = wx.createCanvasContext('share');
    context.drawImage(path, 0, 0, 685, 800);
    // console.log(1);
    console.log(path, 0, 0, 685, 800);
    // console.log(this.path);
    this.setInput(context);
    context.draw();

  },
  //按钮事件方法
  bindGenerateTap: function () {
    //存储图片并生成路径
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'share',
      destWidth: this.data.width,
      destHeight: this.data.height,
      //没传进来
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        
        // console.log(1);
        console.log(tempFilePath);
        //传递图片路径到下一页面
        wx.navigateTo({
          url: '../share/share?Input=' + tempFilePath
        })
      },
      fail: function (res) {
        console.log(res);
      }
    }) 
  },
  //表单提交
  formSubmit:function(e){
    var that = this;
    var Input = e.detail.value.Input;
    // console.log(4);
    console.log(e.detail.value.Input);
    // Input = Input == ""?"10000":Input;
    if(Input === ""){
      Input = "WCL";
    }
    else{ 
      Input = Input;
    }
    // console.log(6);
    // console.log(Input);
    that.setData({
      Input:Input
    });
    wx.showToast({
      title: '生成中...',
      icon:'loading',
      duration:1000
    });
    //重新调用图片
    this.createNewImg();
    
    // console.log(that.createNewImg());
    // console.log(this.data.Input);

  },
   /**
   * 生命周期函数--监听页面渲染
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