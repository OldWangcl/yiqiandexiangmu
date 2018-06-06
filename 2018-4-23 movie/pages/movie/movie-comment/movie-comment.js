// pages/movie/movie-comment/movie-comment.js
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    useKeyboardFlag: true,
    keyboardInputValue: '',
    chooseFiles:[],
    deleteIndex:-1,
    sendMoreMsgFlag:false,
    audio:[],
    // 文章评论数据
    comments: [
      {
        username: '青石', avatar: '/images/comment/comment-02.png',
        txt: '纯粹是因为主题曲因为版权问题听不了，然后发现是这部电影的主题曲，便与这部电影“结缘”了。Vxin表情包里存了很久的那只兔子，居然是爱宠的反派，还是在那么多凶猛动物当老大，简直反差萌啊，即便如此，也抵挡不了它的萌。主人出门过后，每家每户的小动物们都在干嘛呢？当主人回到家，一改平日的调皮凶猛，转头变成了主人身边的软萌小可爱。。',
        img: ["/images/comment/comment-01.png", "/images/comment/comment-02.png", "/images/comment/comment-03.png"],
      },
      {
        username: '水清', avatar: '/images/comment/comment-kl-01.png',
        txt: '郭京飞挺好的，演技自然，奈何剧本俗套，人设单薄，节奏混乱，毫无亮点。灵魂的重量21克这个被用烂的梗在电影中不出意外的没有丝毫感动，满满都是矫情。拜金女主被小三，正妻找上门后离开大款找了个省钱老实人共度一生，大概这么个剧情，因为观念不同引发的一系列闹剧，真真老掉牙的剧本。之间发生的小故事也没有很有趣，使整体显得更平庸 感觉故事要结束的时候大款上线了，强行来一波为了对方好的煽情分离，煽不起来只想笑，也是很尴尬了。有笑有泪应该是随着情节的发展，情绪到了所产生的情感，而不是这一段加个搞笑那一段加个离别，这种自嗨真的很没意思。',
        img: ['/images/comment/comment-kl-01.png', '/images/comment/comment-kl-02.png', '/images/comment/comment-kl-03.png'],
      },
      {
        username: '赤墨', avatar: '/images/comment/comment-kl-01.png',
        txt: '看过《犬之岛》的都知道，片中的日本政权分为了犬猫两派时间线设置为20年后的日本由猫派当道的小林市长执政那么问题来了为什么自古猫犬不合的猫派市长小林定人会送养子阿塔里一只护卫狗呢？   答案见下方',
        img: ['/images/comment/comment-dog-01.png', '/images/comment/comment-dog-02.png', '/images/comment/comment-dog-03.png'],
      },
      {
        username: '林白', avatar: '/images/comment/comment-moview-03.png',
        txt: '评论',
        img: ['/images/comment/comment-moview-03.png', '/images/comment/comment-moview-01.png', '/images/comment/comment-moview-02.png'],
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieId = options.movieId;
  },
  // 语音键盘输入切换事件
  switchInputType: function () {
    this.setData({
      useKeyboardFlag: !this.data.useKeyboardFlag
    })
  },
  // 发送按钮事件
  bindCommentInput: function (e) {
    var val = e.detail.value;
    this.data.keyboardInputValue = val;
  },
  // 提交评论事件
  submitComment: function () {
    var that = this, comments = [],imgs = this.data.chooseFiles;
    //此处延迟的原因是 在点发送时 先执行失去文本焦点 再执行的send 事件 此时获取数据不正确 故手动延迟100毫秒
    setTimeout(function () {
      if (that.data.comments.length > 0) {
        // console.log(5456);
        // console.log(that.data.comments.length);
        // console.log(that.data.keyboardInputValue);
        comments.push({
          avatar: util.ossAliyuncs + "/images/banner5.jpg",
          username: "雨碎江南",
          time: util.formatTime(new Date()),
          txt: that.data.keyboardInputValue,
          img:imgs
        })
        that.setData({
          comments: that.data.comments.concat(comments),
          keyboardInputValue: '',
          sendMoreMsgFlag:false

        })
        wx.showToast({
          title: '评论成功',
          duration: 500,
          icon: 'success'
        })
      }
      // console.log(1545);
      // console.log(that.data.comments.concat(comments));
    }, 100)
  },
  // 语音开始输入事件
  recordStart: function () {
    var that = this;
    this.setData({
      recodingClass: 'recoding'
    });
    console.log(996);
    wx.startRecord({
      success: function (res) {
          var audio=res.tempFilePaths


        console.log(audio);
      }

    })    
  },

  // 语音结束输入事件
  recordEnd: function () {
    this.setData({
      recodingClass: ''
    })
  },
  // 图片选择事件
  sendMoreMsg:function(){
    this.setData({
      sendMoreMsgFlag: !this.data.sendMoreMsgFlag
    })
  },
  // 选择图片
  chooseImage:function(e){
    var that = this;
    var imgArr = this.data.chooseFiles;
    var leftCount = 3 - imgArr.length;
    if(leftCount<=0){
      return this.remind() ;
    }
    var sourceType = [e.currentTarget.dataset.category];
    // console.log(211);
    // console.log(e.currentTarget.dataset.category);
    
    wx.chooseImage({
        count:leftCount,
        sourceType:sourceType,
        success:function(res){
          that.setData({
            chooseFiles:imgArr.concat(res.tempFilePaths)
          })
          console.log(985)
          console.log(that.data.chooseFiles);
        },fail:function(res){
          wx.showToast({
            title: '获取失败',
          })
        }
    })
  },
  // 提醒事件
  remind:function(){
    wx.showToast({
      title: '超出选择~',
      duration:1000,
      icon:'loading'
    })
  },
  // 选择照片后删除事件
  deleteImage:function(e){
    var index = e.currentTarget.dataset.idx;
    // console.log(996);
    // console.log(e.currentTarget.dataset.idx);
    var that = this;
    that.setData({
      deleteIndex:index
    })
    that.data.chooseFiles.splice(index, 1);
    setTimeout(function(){
      that.setData({
        deleteIndex:-1,
        chooseFiles: that.data.chooseFiles
      })
    },500)
    
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
    var conArr = [], that = this;
    that.data.cfBg = false;
    console.log("onReachBottom")
    if (that.data._index < 5) {
      for (var i = 0; i < 5; i++) {
        conArr.push({
          avatar: util.ossAliyuncs + "/images/banner5.jpg",
          uName: "雨碎江南",
          time: util.formatTime(new Date()),
          content: "我是上拉加载的新数据" + i
        })

      }
      //模拟网络加载
      setTimeout(function () {
        that.setData({
          comments: that.data.comments.concat(conArr)
        })
      }, 1000)
    } else {
      that.setData({
        isLoading: false
      })
    }
    ++that.data._index;
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})