// pages/mine/MyProfile/myProfile.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    temp_imgList: [], //预览照片的临时地址
    cloud_imgList: [], //保存到云存储的地址
    sex: '', //用户性别
    nickname: '', //用户名字
    inputValue:'',
    avatar:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const avatar = wx.getStorageSync('avatar')
    const nickname = wx.getStorageSync('nickname')
    this.setData({
      avatar,
      nickname
    })
    const db = wx.cloud.database()
    db.collection('Users')
      .where({
        _openid: app.globalData.openid
      })
      .get()
      .then(res => {
        if (res.data.length != 0) {
          console.log("查询到了")
          console.log(res)
          this.setData({
            temp_imgList: res.data[0]['avatar']

          })
          app.globalData.avatar = res.data[0]['avatar']
        } else {
          console.log("查询不到")
          console.log(res)
        }
      })
      .catch(res => {
        console.log("查询方法失败")
        console.log(res)
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  chooseImage() {
    var maxImageNum = 99
    wx.chooseMedia({
      count: maxImageNum - this.data.temp_imgList.length, //默认9
      sizeType: ['compressed'],
      sourceType: ['album', "camera"],
      success: (res) => {

        var temp_imgList = []
        for (let i = 0; i < res.tempFiles.length; i++) {
          temp_imgList.push(res.tempFiles[i].tempFilePath)
        }
        this.setData({
          temp_imgList: temp_imgList,
        })
        //只异步批量一张图片,上传完成后再更新cloud_imgList
        let that = this
        let uploadTask = []
        for (let i = 0; i < this.data.temp_imgList.length; i++) {
          uploadTask.push(this.uploadFile(i, this.data.temp_imgList[i]))
        }
        Promise.all(uploadTask).then((result) => {
            wx.hideLoading()
            that.setData({
              cloud_imgList: result
            })
            app.globalData.avatar = result

          })
          .catch(err => {
            console.error(err)
          })
        console.log(this.data.temp_imgList)
      }
    });
  },
  save(e) {
    console.log(e)
    wx.showLoading({
      title: '上传中'
    })
    const db = wx.cloud.database()
    db.collection('Users')
      .where({
        _openid: app.globalData.openid
      })
      .get()
      .then(res => {
        if (res.data.length != 0) {
          console.log("查询到了")
          db.collection('Users')
            .where({
              _openid: app.globalData.openid
            })
            .update({
              data: {
                avatar: this.data.cloud_imgList[0],
                nickname:this.data.inputValue
              }
            })
            .then(res => {
              console.log("更新成功")
              wx.hideLoading()
              wx.setStorageSync('avatar', this.data.cloud_imgList[0])
              wx.setStorageSync('nickname', this.data.inputValue)
            })
            .catch(res => {
              console.log("更新失败")
              console.log(res)
            })
        } else {
          console.log("查询不到")
          db.collection('Users')
            .add({
              data: {
                avatar: this.data.cloud_imgList[0],
                nickname:this.data.inputValue
              }
            })
            .then(res => {
              console.log("添加成功")
              wx.hideLoading()
            })
            .catch(res => {
              console.log("添加失败")
              console.log(res)
            })
        }

      })
      .catch(res => {
        console.log("查询方法失败")
        console.log(res)
      })
  },
  // 异步上传单个文件
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
  getInputValue(event) {
    console.log(event.detail.value)
    this.data.inputValue = event.detail.value
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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