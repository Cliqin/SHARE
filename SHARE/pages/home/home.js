var app =getApp()
Page({
  data: {
    imgUrls: [
      '/images/lunbo3.png',
    ],
    list: ['🎉“计算机学院创新小分队', '🎉SHARE上线', '敬请期待'],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    interval2: 11000,
    duration: 1000,
    duration2: 2000,
    windowHeight: wx.getSystemInfoSync().windowHeight,
    windowWidth: wx.getSystemInfoSync().windowWidth,
    btnSize: 0,
    token: wx.getStorageSync('token'),
    status: 2,
    canIUseGetUserProfile: false,
    hasUserInfo: false,
  },
  onLoad() {
    console.log('999' + this.data.token);
    var that = this;
    this.setData({
      btnSize: 0.8 * 0.32 * this.data.windowHeight,
    })
    const token = wx.getStorageSync('token')
    if (token == '') {
      wx.navigateTo({
        url: '../login/login',
      })
    }
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  onShow() {
    
    
  },
  onHide: function () {
    this.setData({
      status: 2
    })
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  toEntrance() {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  toGuest() {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  toGroup() {
    wx.navigateTo({
        url: '/pages/index/index',
      })
    
  },
  toPark() {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  toUser() {
    wx.navigateTo({
      url: '/pages/mine/mine',
    })
  },
  // test0(){
  //   wx.navigateTo({
  //     url: '../user/user',
  //   })
  // },
  // test1(){
  //   wx.navigateTo({
  //     url: '../guest/guest',
  //   })
  // },
  // test2() {
  //   wx.navigateTo({
  //     url: '../entrance/entrance',
  //   })
  // }
  getInfo(){
      var that =this
    wx.getUserProfile({
      desc:'获取用户必要的信息',
      success(res){
        console.log(res)

        app.globalData.userInfo = res.userInfo
        wx.setStorageSync('userInfo', res.userInfo)//键值对

        wx.navigateBack({
          success(res){
            wx.showToast({
              title: '授权成功！',
            })
          }
        })


      }
    })

  }
})

