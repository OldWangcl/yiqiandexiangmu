// pages/movie/movie-detail/movie-detail.js
var util = require('../../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
    upNum: 1156,
    commentNum: 0,
    collectionNum: 8554,
    likeStatus:false,
    collectionStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieId = options.id;
    // console.log(996);
    // console.log(options.id);
    var url = app.globalData.doubanBase + '/v2/movie/subject/' + movieId;
    util.http(url, this.processDoubanData);
    // console.log(url);
  },
  // 点赞功能事件
  onUpTap: function (event) {
    this.setData({
      likeStatus: !this.data.likeStatus,
    }); 
    if (this.data.likeStatus) {
      this.setData({
        upNum: this.data.upNum + 1
      })
      wx.showToast({
        title: '点赞成功',
        duration: 1000,
        icon: 'success',
        mask:true
      })
    } else if (!this.data.likeStatus) {
      this.setData({
        upNum: this.data.upNum - 1
      })
      wx.showToast({
        title: '点赞取消',
        duration: 1000,
        icon: 'success',
        mask:true
      })
    }
  },
  // 收藏功能事件
  onCollectionTap: function (event) {
    this.setData({
      collectionStatus: !this.data.collectionStatus,
    });
    if (this.data.collectionStatus) {
      this.setData({
        collectionNum: this.data.collectionNum + 1
      })
      wx.showToast({
        title: '收藏成功',
        duration: 1000,
        icon: 'success'
      })
    } else if (!this.data.collectionStatus) {
      this.setData({
        collectionNum: this.data.collectionNum - 1
      })
      wx.showToast({
        title: '取消收藏',
        duration: 1000,
        icon: 'success'
      })
    }
  },
  // 评论带参跳转
  onCommentTap:function(e){
    var id = e.currentTarget.dataset.movieId;
    // console.log(995);
    // console.log(e.currentTarget.dataset.movieId);
    wx.navigateTo({
      url: '../movie-comment/movie-comment?movieId=' + id
    })
    console.log(997);
    // console.log('../movie-comment/movie-comment?movieId=' + id);
  },
  processDoubanData: function (data) {
    if (!data) {
      return;
    }
    var director = {
      avatar: "",
      name: "",
      id: ""
    }
    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        director.avatar = data.directors[0].avatars.large

      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }

    var movie = {
      movieImg: data.images ? data.images.large : "",
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      generes: data.genres.join("、"),
      stars: util.convertToStarsArray(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: util.convertToCastString(data.casts),
      castsInfo: util.convertToCastInfos(data.casts),
      summary: data.summary,
      movieId: data.id
    }
    console.log(999);
    console.log(movie);
    this.setData({
      movie: movie
    });
    // 动态获取电影标题
    wx.setNavigationBarTitle({
      title: data.title
    })
    // console.log(996);
    // console.log(movie);
  },
  // 预览电影海报
  viewMoviePostImg: function (e) {
    var url = e.currentTarget.dataset.src;
    // console.log(996);
    // console.log(e.currentTarget.dataset.src);
    wx.previewImage({
      urls: [url]
    })
  },
  // 预览人物照片
  catchImgView: function (e) {
    var url = e.currentTarget.dataset.src;
    // console.log(996);
    // console.log(e.currentTarget.dataset.src);
    wx.previewImage({
      urls: [url],
      current: url
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