var app = getApp();
const db = wx.cloud.database() 
Page({

  data: {
    ifImage: false, //是否有图片
    title: '',
    content: '',
    temp_imgList: [], //预览照片的临时地址
    cloud_imgList: [], //保存到云存储的地址
  },
  onLoad: function (options) {
    console.log(db.collection(app.mould))
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  viewImage(e) {
    console.log(e)
    wx.previewImage({
      urls: this.data.temp_imgList,
      current: e.currentTarget.dataset.url
    })
  },

  chooseImage() {
    var maxImageNum = 9
    wx.chooseMedia({
      count: maxImageNum - this.data.temp_imgList.length, //默认9
      sizeType: ['compressed'],
      sourceType: ['album', "camera"],
      success: (res) => {
        var temp_imgList = []
        for (let i = 0; i < res.tempFiles.length; i++) {
          temp_imgList.push(res.tempFiles[i].tempFilePath)

        }

        var temp_imgList = this.data.temp_imgList.concat(temp_imgList)

        this.setData({
          ifImage: true,
          temp_imgList: temp_imgList,
        })
        console.log(this.data.temp_imgList)
      }
    });
  },

  deleteImage(e) {
    console.log(e)
    console.log(this.data.temp_imgList)
    wx.showModal({
      title: 'Warning',
      content: '确定要删除这张照片吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        console.log(res)
        if (res.confirm) {
          console.log(this.data.temp_imgList)
          this.data.temp_imgList.splice(e.currentTarget.dataset.index, 1);
          console.log(this.data.temp_imgList)
          this.setData({
            temp_imgList: this.data.temp_imgList,
          })
          //设置ifImage
          if (this.data.temp_imgList == 0) {
            this.setData({
              ifImage: false
            })
          }
        }

      }
    })
  },

  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  sendcontent(event) {
    this.setData({
      content: event.detail.value
    })
  },
  sendtitle(event) {
    this.setData({
      title: event.detail.value
    })
  },

  Submit() {
    if (this.data.title == '' || this.data.content == '') {
      wx.showToast({
        title: '标题/内容不能为空',
        icon: "none",
      })
      return
    } else if (app.globalData.userInfo == null) {
      wx.navigateTo({
        url: '/pages/home/home',

      }), wx.showToast({
        title: '请先登录',

      })
    } else {
      wx.showLoading({
        title: '上传中'
      })
      let that = this

      //异步批量上图片,上传完成后再提交到数据库
      let uploadTask = []
      const avatar = wx.getStorageSync('avatar')
      const nickname = wx.getStorageSync('nickname')
      for (let i = 0; i < this.data.temp_imgList.length; i++) {
        uploadTask.push(this.uploadFile(i, this.data.temp_imgList[i]))
      }
      Promise.all(uploadTask).then((result) => {
          wx.hideLoading()
          that.setData({
              cloud_imgList: result
            }),
            //提交数据库
              
            db.collection(app.mould).add({
              data: {
                ifImage: that.data.ifImage,
                // nickName: nickname,
                // faceImg: avatar,
                nickName: app.globalData.userInfo.nickName,
                faceImg: app.globalData.userInfo.avatarUrl,
                title: that.data.title,
                content: that.data.content,
                images: that.data.cloud_imgList,
                time: db.serverDate(),
                commentList: [],
                prizeList:[]
              },
              success(res) {
                console.log(res)
                wx.navigateBack(),
                  wx.showToast({
                    title: '发布成功',
                  })
              }
            })
        })
        .catch(err => {
          console.error(err)
        })
    }
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

  //全部清空数据库,慎用!!!(还没写)
  ClearDataBase() {
    const db = wx.cloud.database()
    db.collection("share").doc().remove({})
  }
})