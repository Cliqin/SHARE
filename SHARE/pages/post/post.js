 var app = getApp();

Page({

  data: {
    title: '',
    content: '',
    imgList: [],
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  viewImage(e) {
    console.log(e)
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },

  chooseImage() {
    var maxImageNum = 9
    wx.chooseMedia({
      count: maxImageNum - this.data.imgList.length, //默认9
      // sizeType: ['compressed'],
      sourceType: ['album', "camera"],
      success: (res) => {
        var imgList = []
        for (let i = 0; i < res.tempFiles.length; i++) {
          imgList.push(res.tempFiles[i].tempFilePath)

        }
        var imgList = this.data.imgList.concat(imgList)

        this.setData({
          imgList: imgList,
          // curImgIndex: imgList.length - 1,
          // hideAddBtn: imgList.length >= this.data.tabs[this.data.currentTab].imageNum ? true : false
        })
        console.log(this.data.imgList)
      }
    });
  },

  deleteImage(e) {
    console.log(e)
    console.log(this.data.imgList)
    wx.showModal({
      title: 'WARN',
      content: '确定要删除这张照片吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        console.log(res)
        if (res.confirm) {
          console.log(this.data.imgList)
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          console.log(this.data.imgList)
          this.setData({
            imgList: this.data.imgList,
            // curImgIndex: (e.currentTarget.dataset.index - 1) < 0 ? 0 : (e.currentTarget.dataset.index - 1),
            // hideAddBtn: this.data.imgList.length >= this.data.tabs[this.data.currentTab].imageNum ? true : false
          })
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
  submit() {
    
    // if (this.data.title == '' || this.data.content == '') {
    //   wx.showToast({
    //     title: '都不能为空哦',
    //   })

    // } else {
      const db = wx.cloud.database()
      db.collection("share").add({
          data: {
            nickName:app.globalData.userInfo.nickName,
            faceImg:app.globalData.userInfo.avatarUrl,
            title: this.data.title,
            content: this.data.content,
            images:this.data.imgList,
            time:Date.now()
          },
        success(res){
          console.log(res)
          wx.hideLoading()
          wx.navigateBack({
          
            success(res) {
            wx.showToast({ 
            title: '发布成功',
          })
        }
          })
          
          }
        })
    }

})