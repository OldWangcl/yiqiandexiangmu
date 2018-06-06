// pages/movie/movie.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // swiper js start
    imgs: [
      '/images/swiper/sw-01.jpg',
      '/images/swiper/sw-02.jpg',
      '/images/swiper/sw-03.jpg',
      '/images/swiper/sw-04.jpg',
      '/images/swiper/sw-05.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    circular: true,
    // swiper js end

    // 电影页面js start
    inTheaters:{},
    comingSoon:{},
    top250:{},
    wrapShow:true,
    searchPanelShow:false,
    searchResult:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";
    // console.log(996);
    // console.log(inTheatersUrl);
    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListData(top250Url, "top250", "热门电影");
 
  },
  // getMovieListData方法 获取电影数据
  getMovieListData:function(url, settedKey, categoryTitle){
    var that = this;
    wx.request({
      url: url,
      method:'GET',
      header:{
        "content-type":"json"
      },
      success:function(res){
        that.processDoubanData(res.data, settedKey, categoryTitle);
      },
      fail:function(error){
        console.log(error);
      }
    })
  },
  // 处理豆瓣电影数据
  processDoubanData: function (moviesDouban, settedKey, categoryTitle) {
    // console.log(996);
    var movies = [];
    // for中的代码将所有豆瓣电影数据转化成我们需要的格式
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        // 电影标题只取前6个字符
        title = title.substring(0, 6) + "...";
      }
      // console.log(title.substring(0, 6) + "...");
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp);
      
    }
    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    }
    this.setData(readyData);
  
  },
  // 跳转到more-movie页面
  catchMoreTap:function(e){
    var category = e.currentTarget.dataset.category;
    // console.log(996);
    // console.log(e.currentTarget.dataset.category);
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category
    })
    // wx.showToast({
    //   title: '加载中',
    //   icon:'loading',
    //   duration:1000
    // })
   wx.hideNavigationBarLoading();
  },
  // 跳转到文章详情页面
  catchMovieTap:function(e){
    var movieId = e.currentTarget.dataset.movieId;
    // console.log(996);
    // console.log(e.currentTarget.dataset.movieId);
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id=' + movieId
    });
  },
  // 显隐切换效果事件
  onBindFocus:function(){
    this.setData({
      wrapShow: !this.data.wrapShow,
      searchPanelShow: !this.data.searchPanelShow,
    })
  },
  // 点击"x"关闭搜索界面
  onCancelImgTap:function(){
    this.setData({
      wrapShow: true,
      searchPanelShow: false,
      searchResult: {},
      inputValue:""
    })
  },
  // 响应搜索事件
  onBindConfirm:function(e){
    var keyWord = e.detail.value;
    // console.log(996);
    // console.log(e.detail.value);
    var searchUrl = app.globalData.doubanBase + '/v2/movie/search?q=' + keyWord;
    this.getMovieListData(searchUrl, "searchResult", "");
    wx.showToast({
      title: '努力加载中',
      duration:1000,
      icon:'loading'
    })
  },
  // 封装模态弹窗
  showModal:function(title, content, callback){
    wx.showModal({
      title: title,
      content: content,
      success:function(res){
        if(res.confirm){
          callback&&callback();
        }
      }
    })
  },
  // 二维码事件
  scanQRCode:function(){
    var that = this;
    
    wx.scanCode({
      success:function(res){
        that.showModal('扫描二维码',res.result,false);
      },
      fail:function(res){
        that.showModal('扫描二维码','扫描失败，请重试',false);
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
    // 在标题栏中显示加载
    wx.showNavigationBarLoading();
    setTimeout(function(){
      // 结束加载
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    },1500)
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