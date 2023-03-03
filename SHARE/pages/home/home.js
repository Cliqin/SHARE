Page({
  data: {
    userInfo:{},
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
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
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
})