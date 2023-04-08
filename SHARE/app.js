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

        }),
        wx.cloud.callFunction({
          name: 'getUserOpenid',
          success(res) {
            console.log(res)
            that.globalData.openid = res.result.openid
            const db = wx.cloud.database()
            db.collection('Users')
              .where({
                _openid: that.globalData.openid
              })
              .get()
              .then(res => {
                if (res.data.length != 0) {
                  console.log("查询到了")
                  console.log(res)
                  that.globalData.avator = res.data[0]['avator']
                } else {
                  console.log("查询不到")
                  console.log(res)
                }
              })
              .catch(res => {
                console.log("查询方法失败")
                console.log(res)
              })
          }
        })
    }

  },
  globalData: {
    userinfo: null,
    openid: null,
    nickName: '',
    avator: ''
  }
});