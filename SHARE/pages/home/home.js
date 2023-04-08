const app = getApp()
Page({
  data: {
    imgUrls: [
      '/images/lunbo3.png',
    ],
    list: ['🎉“计算机学院创新小分队', '🎉SHARE上线', '敬请期待'],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    interval2: 2000,
    duration: 1000,
    duration2: 2000,
    windowHeight: wx.getSystemInfoSync().windowHeight,
    windowWidth: wx.getSystemInfoSync().windowWidth,
    btnSize: 0,
    hasavatar: false,
    defaultavatar: '/images/emoij32x32.png',
    userInfo: '',
    avatar: '',
    nickname: ''
  },
  onLoad() {
    //查询数据库是否有用户信息了
    const db = wx.cloud.database()
    db.collection('Users')
      .where({
        _openid: app.globalData.openid
      })
      .get()
      .then(res => {
        if (res.data.length != 0) {
          app.globalData.avatar = res.data[0]['avatar']
          app.globalData.nickName = res.data[0]['nickname']
        } else {
          this.setData({
            avatar: this.data.defaultavatar,
            nickname:'匿名用户'
          })
          console.log("查询不到")
          console.log(res)
        }
      })
      .catch(res => {
        console.log("查询方法失败")
        console.log(res)
      })
    //到这个页面先判断本地有没有本地登录信息 nickname avatar等

  },
  onReady() {
    const avatar = wx.getStorageSync('avatar')
    const nickname = wx.getStorageSync('nickname')
    const userInfo = wx.getStorageSync('userInfo')

    if (avatar != '') {
      this.setData({
        hasavatar: true
      })
    }
    if(nickname==''){
      wx.setStorageSync('nickname', '匿名用户')
    }
    this.setData({
      avatar,
      nickname,
      userInfo,
      btnSize: 0.8 * 0.32 * this.data.windowHeight,
    })
  },
  // getUserProfile(e) {
  //   //更新数据库用户信息
  //   const db = wx.cloud.database()
  //   db.collection('Users')
  //     .where({
  //       _openid: app.globalData.openid
  //     })
  //     .get()
  //     .then(res => {
  //       //如果有用户
  //       if (res.data.length != 0) {
  //         this.setData({
  //           avatar: res.data[0]['avatar'],
  //           hasavatar: true
  //         })
  //         //设置全局变量头像
  //         app.globalData.avatar = res.data[0]['avatar']
  //         //设置存储本地头像
  //         wx.setStorageSync('avatar', res.data[0]['avatar'])
  //       }
  //       //否则
  //       else {
  //         this.setData({
  //           avatar: this.data.defaultavatar
  //         })
  //         console.log("查询不到")
  //         console.log(res)
  //       }
  //     })
  //     .catch(res => {
  //       console.log("查询方法失败")
  //       console.log(res)
  //     })
  // },
  onShow() {
    //更新头像
    this.setData({
      avatar: app.globalData.avatar
    })
  },
  onHide: function () {

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
})