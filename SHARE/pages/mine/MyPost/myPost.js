// pages/mine/myPost.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    actionList: [],
    default_img: "https://img.tukuppt.com/png_preview/00/45/71/JOGIZX506Q.jpg!/fw/780",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('加载')
    console.log(app.globalData.openid)
    this.setData({
      myOpenid: app.globalData.openid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    var that = this
    const db = wx.cloud.database()
    var collectionNames = ['bisai', 'jiuye', 'kaogong', 'kaoyan',"share"]
    let action = []
    Promise.all(collectionNames.map(name => {
      return db.collection(name).orderBy('time', 'desc').where({
        _openid: app.globalData.openid
      }).get()
    })).then(results => {
      for (let i = 0; i < results.length; i++) {
        action = action.concat(results[i].data)
      }
      console.log(action)
      this.setData({
        actionList: action
      })
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },
  viewImage(e) {
    console.log(e)
    wx.previewImage({
      urls: e.currentTarget.dataset.image_list,
      current: e.currentTarget.dataset.image_list[0]
    })
  },
  todetail(event) {
    console.log(event.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + event.currentTarget.dataset.id,
    })
  },
  uploadFile: function (index, filePath) {
    //返回上传文件后的信息
    return new Promise(function (callback) {

      wx.cloud.uploadFile({
        cloudPath: './Post_Images/' + index + Date.now(),
        filePath: filePath,
        success: res => {
          console.log('上传图片成功', res)
          callback(res.fileID)
        },
        fail: err => {
          wx.showToast({
            title: '上传失败',
            icon: "none"
          })
          console.log(err)
        }
      })

    })
  },
  deleteAction(event) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除此帖吗？',
      success(res) {
        if (res.confirm) {
          wx.cloud.database().collection('share')
            .doc(event.currentTarget.dataset.id)
            .remove({
              success(res) {
                console.log(res)
                wx.showToast({
                  title: '删除成功！',
                })
                that.onLoad()
              }
            })
        }
      }
    })
  },
  todetail(event) {
    console.log(event.currentTarget.dataset.id)
    wx.navigateTo({

      url: '/pages/detail/detail?id=' + event.currentTarget.dataset.id + '&param=' + event.currentTarget.dataset.param,
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.onReady()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})