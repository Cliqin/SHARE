const app = getApp()
Page({
  data: {
    userInfo: app.globalData.userInfo,
    hasUserInfo: false,
    avatar: '',
    nickname: '',
  },
  onLoad() {
    console.log('what')
    this.setData({
      userInfo: app.globalData.userInfo,
      avatar: app.globalData.avatar,
      nickname:app.globalData.nickName
    })
    wx.setStorageSync('avatar', app.globalData.avatar)
    wx.setStorageSync('nickname', app.globalData.nickName)
  },
  ToMy(e) {
    //跳转页面
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
      case"about":
      wx.navigateTo({
        url: '/pages/mine/about/about',
      })
      break
      case"feedback":
      wx.navigateTo({
        url: '/pages/mine/feedback/feedback',
      })
      break
      default:
        console.warn("unknown op case")
        return
    }
  },
  onShow() {
    this.setData({
      userInfo: app.globalData.userInfo,
      avatar: app.globalData.avatar,
      nickname:app.globalData.nickName
    })
  }
})