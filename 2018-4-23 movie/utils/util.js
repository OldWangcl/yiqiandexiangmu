var ossAliyuncs = "http://soupu.oss-cn-shanghai.aliyuncs.com";
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function formatDate(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 评分格式转化成函数
function convertToStarsArray(stars) {
  var num = stars / 10;
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    }
    else {
      if ((i - num) === 0.5) {
        array.push(0.5)
      } else {
        array.push(0)
      }
    }
  }
  return array
}
// 封装request方法
function http(url, callBack){
  wx.request({
    url: url,
    method:'GET',
    header:{
      "content-type":"json"
    },
    success:function(res){
      callBack(res.data);
    },
    fail:function(error){
      console.log(error);
    }
  })
}
// 将数组转换成以 "/" 分隔的字符串
function convertToCastString(casts){
  var castsjoin = "";
  for(var idx in casts){
    castsjoin = castsjoin + casts[idx].name + "/";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}
function convertToCastInfos(casts){
  var castsArray = [];
  for(var idx in casts){
    var cast = {
      img:casts[idx].avatars?casts[idx].avatars.large:"",
      name:casts[idx].name
    }
    // console.log(996);
    // console.log(casts[idx].avatars ? casts[idx].avatars.large : "");
    castsArray.push(cast);
  }
  return castsArray;
}
module.exports = {
  formatTime: formatTime,
  convertToStarsArray: convertToStarsArray,
  http:http,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos,
  ossAliyuncs: ossAliyuncs
}
