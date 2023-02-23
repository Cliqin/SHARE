//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    this.getTypes();
    this.login();
  },
  login:function() {
    var that = this;
      wx.login({
        success: function(res){
          console.log(res);
          wx.getUserInfo({
            success: function(res){
              
            }
          })
        }
      })
  },


  decode:function(encryptedData, signature, iv) {
      encryptedData = atob(encryptedData);
      signature = atob(signature);
      console.log(encryptedData);
      console.log(signature);
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              console.log(res);
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  getTypes: function() {
      var that = this;
      var types =  [{
          ArticleTypeID : 0,
          ArticleTypeName : "全部"
        },{
          ArticleTypeID : 3132,
          ArticleTypeName : "经验交流"
        },{
          ArticleTypeID : 875,
          ArticleTypeName : "改进建议"
        },{
          ArticleTypeID : 2038,
          ArticleTypeName : "常见问题"
        },{
          ArticleTypeID : 2033,
          ArticleTypeName : "奇闻趣事"
        },{
          ArticleTypeID : 1,
          ArticleTypeName : "操作指南"
        }];
      that.globalData.types = types;
  },
  getMoreArticle: function(pn, typeId, h, hongbao, rspan, cb) {
    wx.request({
      url: 'http://vzan.com/f/getarticlebottom-1?pageIndex=1&typeId=2038&h=0&hongbao=&from=qq&rspan=1',
      data: {
        pageIndex:pn,
        typeId:typeId,
        h:h,
        hongbao:"",
        from:"qq",
        rspan:rspan
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type":"application/json;charset=utf-8"
      }, // 设置请求的 header
      success: function(res){
        console.log("request success");
        if (typeof cb == "function") {
          cb(res);
        }
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  globalData:{
    userInfo:null,
    types:[],
    voice:{}
  },
  setGlobalData: function(data) {
    this.globalData = data;
  }
})