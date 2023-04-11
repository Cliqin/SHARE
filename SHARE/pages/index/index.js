var index = require("../../data/index-list.js")
var util = require("../../utils/util.js")
var comobj = require("../../obj/comobj.js")
//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    motto: 'Hello World',
    articles: [],
    pageIndex: 1,
    pageSize: 2,
    audioIcon: "",
    selected: true,
    selected1: false,

    default_img: "https://img.tukuppt.com/png_preview/00/45/71/JOGIZX506Q.jpg!/fw/780",
    css: {
      "bankuaiSelected": ""
    },
    typeList: [],
    currentTypeId: 0,
    hot: 0,
    scrollLeft: 0,
    bankuai: ''
  },

  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (event) {
    this.setData({
      myOpenid: app.globalData.openid,
      bankuai: event.param
    })
  },
  onShow: function () {
    console.log("onShow")
    const db = wx.cloud.database()
    db.collection(this.data.bankuai)
      .orderBy('time', 'desc')
      .get()
      .then((res) => {
        console.log(res)
        this.setData({
          actionList: res.data
        })
        wx.stopPullDownRefresh()
      })
      .catch(console.error)
    
  },
  //查看图片
  viewImage(e) {
    console.log(e)
    wx.previewImage({
      urls: e.currentTarget.dataset.image_list,
      current: e.currentTarget.dataset.image_list[0]
    })
  },

  toPost(event) {
    console.log(event)
    var that = this
    if (app.globalData.userInfo == null) {
      wx.navigateTo({
          url: '/pages/home/home'
        }),
        wx.showToast({
          title: '请先登录',
        })
    } else {
      wx.navigateTo({
        url: "/pages/post/post?param=" + that.data.bankuai,
      })
    }
  },

  todetail(event) {
    var that = this
    console.log(event.currentTarget.dataset.id)
    console.log('bankuai', this.data.bankuai)
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + event.currentTarget.dataset.id + '&param=' + that.data.bankuai,
    })
  },

  deleteAction(event) {

    wx.showToast({
      title: '请进入帖子再进行删除哦',
      icon: "none"
    })
    // var Id = event.currentTarget.dataset.id;
    // console.log(Id)
    // var that = this;
    // console.log(that.data.bankuai)
    // wx.showModal({
    //   title: "提示",
    //   content: "确定要删除该帖子吗？",
    //   success(res) {
    //     if (res.confirm) {
    //       console.log('确定')
    //       wx.cloud.database()
    //         .collection(that.data.bankuai)
    //         .doc(event.currentTarget.dataset.id)
    //         .remove({
    //           success:res => {
    //             console.log(res)
    //             wx.showToast({
    //               title: '删除成功',
    //             })
    //             console.log('fufufufu')
    //           },
    //           fail:err =>{
    //             wx.showToast({
    //               title: '上传失败',
    //               icon: "none"
    //             })
    //             console.log('fufufufu')
    //             console.log(err)
    //           }
    //         })

    //     }
    //   }
    // });
  },
  onShareAppMessage(event) {
    console.log(event)
    console.log(this.data.actions)
    return {
      title: 'Welcome to SHARE',
      imageUrl: '',
      path: 'pages/index/index'
    }
  },
  onPullDownRefresh() {
    // this.getActionList() 
    this.onShow()
  }
})