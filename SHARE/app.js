// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      var that = this
      wx.cloud.init({
          // env 参数说明：
          //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
          //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
          env: 'cloud1-3g5pjz0pb5a1820d',
          //   如不填则使用默认环境（第一个创建的环境）
          // env: 'my-env-id',
          traceUser: true,

        })
        if(wx.getStorageSync('openid')){
          this.globalData.openid = wx.getStorageSync('openid')
        }
    
        wx.cloud.callFunction({
          name: 'getUserOpenid',
          success(res) {
            console.log(res)
            that.globalData.openid = res.result.openid
            wx.setStorageSync('openid', res.result.openid)

          }
        })
    }
  },
  globalData: {
    userinfo: null,
    openid: null,
    nickName: '',
    avatar: null
  }
});