const app = getApp()
Page({
  data: {
    userInfo: app.globalData.userInfo,
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    avator:'',
    nickname:'',
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        userInfo: app.globalData.userInfo,
        avator:app.globalData.avator,
      })
    }
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
  ToMy(e) {
    //跳转页面
    console.log(e.target.dataset.op)
    switch (e.target.dataset.op) {
      case "Post":
        wx.navigateTo({
          url: '/pages/mine/MyPost/myPost',
        })
        break
      case "Interact":
        wx.navigateTo({
          url: '/pages/mine/MyInteract/myInteract',
        })
        break
      case "Recent":
        wx.navigateTo({
          url: '/pages/mine/MyRecent/myRecent',
        })
        break
      case "Profile":
        wx.navigateTo({
          url: '/pages/mine/MyProfile/myProfile',
        })
        break
      default:
        console.warn("unknown op case")
        return
    }
  },
  onShow(){
    this.setData({
      avator:app.globalData.avator
    })
  }
})