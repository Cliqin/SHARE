
const app = getApp()

Page({
  data: {
    userInfo:app.globalData.userInfo,
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    test:"123"
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        userInfo: app.globalData.userInfo,  
      })
    }
  },
  onReady(){
    // this.setData({
    //   userInfo: app.globalData.userInfo,   
    // })
  },

  getUserProfile(e) {
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
})
