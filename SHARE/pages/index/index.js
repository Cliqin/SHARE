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
    var that = this
    //调用应用实例的方法获取全局数
    
  },

  toPost() {
    if(app.globalData.userInfo == null) 
    {
     
      wx.navigateTo({
        url:'/pages/home/home'
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

  getActionList (){
    var that =this
    wx.cloud.database().collection('share').get({
      success(res){
        console.log(res)
        that.setData ({
      actionList:res.data
    })
      }
    })
  
  },
  onPullDownRefresh() 
{
  this.getActionList()
}
})

