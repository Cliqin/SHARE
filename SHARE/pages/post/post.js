
var app = getApp();

Page({
  data:{
    
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },

  submit(){
    wx.cloud.database().collection('set').get()
    .then(res =>{
      console.log(res)
    })
    .catch(err =>{
      console.log(err)
    })
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})