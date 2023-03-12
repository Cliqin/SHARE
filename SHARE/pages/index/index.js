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

    default_img: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
    css: {
      "bankuaiSelected": ""
    },
    typeList: [],
    currentTypeId: 0,
    hot: 0,
    scrollLeft: 0
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
    //调用应用实例的方法获取全局数

  },
  onShow:function(){
    var that = this
    this.getActionList()
  },
  //查看图片
  viewImage(e) {
    console.log(e)
    wx.previewImage({
      urls: e.currentTarget.dataset.image_list,
      current: e.currentTarget.dataset.image_list[0]
    })
  },

  toPost() {
    if (app.globalData.userInfo == null) {

      wx.navigateTo({
        url: '/pages/home/home'
      }),
        wx.showToast({
          title: '请先登录',
        })
    }
    else {
      wx.navigateTo({
        url: "/pages/post/post"
      })
    }
  },

  getActionList() {
    var that = this
    wx.cloud.database().collection('share').get({
      success(res) {
        console.log(res)
        wx.stopPullDownRefresh()
        that.setData({
          actionList: res.data
        })
        
      }
    })

  },
  
  onPullDownRefresh() {
    this.getActionList() 
  }
})

