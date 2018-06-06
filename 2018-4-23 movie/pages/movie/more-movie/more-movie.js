// pages/movie/more-movie/more-movie.js
var app = getApp();
var util = require('../../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    searchLoading:false,
    slide:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category;
    this.data.navigateTitle = category;
    var dataUrl = '';
    switch (category) {
      case '正在热映':
        dataUrl = app.globalData.doubanBase + '/v2/movie/in_theaters';
        break;
      case '即将上映':
        dataUrl = app.globalData.doubanBase + '/v2/movie/coming_soon';
        break;
      case '热门电影':
        dataUrl = app.globalData.doubanBase + '/v2/movie/top250';
        break;
    }
    this.data.requestUrl = dataUrl;
    util.http(dataUrl, this.processDoubanData);
    // console.log(996);
      wx.setNavigationBarTitle({
        title: '更多影讯'
    })
  },
  // 处理豆瓣数据
  processDoubanData: function (moviesDouban) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];

      // console.log(subject);
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...';
      }
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    var totalMovies = [];
    totalMovies = this.data.movies.concat(movies);
    this.setData({
      movies: totalMovies
    })
    wx.stopPullDownRefresh();
    // 隐藏loading状态
    wx.hideNavigationBarLoading();
  },
  // 跳转到文章详情页面
  catchMovieTap: function (e) {
    var movieId = e.currentTarget.dataset.movieId;
    // console.log(996);
    // console.log(e.currentTarget.dataset.movieId);
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId
    });
   
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title:this.data.navigateTitle
    });
    wx.showNavigationBarLoading();
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
  onPullDownRefresh: function (e) {
    var refreshUrl = this.data.requestUrl + '?star=0 & count=20';
    this.data.movies = [];
    util.http(refreshUrl, this.processDoubanData);
    // 显示下拉刷新加载动画
    wx.showNavigationBarLoading();
    setTimeout(function(){
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    },1500)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var totalCount = this.data.movies.length;
    var nextUrl = this.data.requestUrl + '?start=' + totalCount + '&count=20';
    util.http(nextUrl, this.processDoubanData);
    // 显示loading状态
    wx.showNavigationBarLoading();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target);
    }
    return {
      title: '最新电影资讯',
      path: '/pages/movie/movie',
      success: function (res) {
        // 转发成功
        console.log(res);
      },
      fail: function (res) {
        // 转发失败
        console.log(res);
      }
    }
  }
})