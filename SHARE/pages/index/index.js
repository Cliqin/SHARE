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
    selected:true,
    selected1:false,

    default_img: "https://img.tukuppt.com/png_preview/00/45/71/JOGIZX506Q.jpg!/fw/780",
    css: {
      "bankuaiSelected": ""
    },
    typeList: [],
    currentTypeId: 0,
    hot: 0,
    scrollLeft: 0,
    bankuai:''
  },

  selected:function(e){
    this.setData({
      selected1:false,
      selected:true
    })
  },
  selected1:function(e){
    this.setData({
      selected:false,
      selected1:true
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (event) {
    console.log(event)
    // console.log('event.param',event.param)
    var that = this
    setTimeout(function(){
    console.log(app.globalData.openid)
    that.setData ({
      myOpenid:app.globalData.openid,
      bankuai:event.param
    })
    })
    const db = wx.cloud.database()
   
   // const param = options.param;
    // if (app.mould == 'kaogong') {
    //   const db = wx.cloud.database()
    //   db.collection('kaogong').orderBy('time','desc').get()
    //   .then((res)=>{
    //     console.log(res)
    //     that.setData({
    //         actionList: res.data
    //       })
    //       wx.stopPullDownRefresh()
    //   })
    //   .catch(console.error)
      
    // } else if (app.mould == 'kaoyan') {
    //   const db = wx.cloud.database()
    //   db.collection('kaoyan').orderBy('time','desc').get()
    //   .then((res)=>{
    //     console.log(res)
    //     that.setData({
    //         actionList: res.data
    //       })
    //       wx.stopPullDownRefresh()
    //   })
    //   .catch(console.error)
    // }  else if (app.mould == 'jiuye') {
    //   const db = wx.cloud.database()
    //   db.collection('jiuye').orderBy('time','desc').get()
    //   .then((res)=>{
    //     console.log(res)
    //     that.setData({
    //         actionList: res.data
    //       })
    //       wx.stopPullDownRefresh()
    //   })
    //   .catch(console.error)
    // }else if (app.mould == 'bisai') {
    //   const db = wx.cloud.database()
    //   db.collection('bisai').orderBy('time','desc').get()
    //   .then((res)=>{
    //     console.log(res)
    //     that.setData({
    //         actionList: res.data
    //       })
    //       wx.stopPullDownRefresh()
    //   })
    //   .catch(console.error)
    // }
    
   
    // this.getActionList()

    //调用应用实例的方法获取全局数

    db.collection(event.param).orderBy('time', 'desc').get()
    .then((res) => {
      console.log(res)
      that.setData({
        actionList: res.data
      })
      wx.stopPullDownRefresh()
    })
    .catch(console.error)

  },
  onShow:function(){
    
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
		var that=this
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
        url: "/pages/post/post?param="+that.data.bankuai,
      })
    }
  },

  // getActionList() {
  //   var that = this
  //   wx.cloud.database().collection('share').orderBy('time','desc')
  //   .get({   
  //     success(res) {
  //       console.log(res)
  //       wx.stopPullDownRefresh()
  //       that.setData({
  //         actionList: res.data
  //       })
        
  //     }
  //   })

  // },
  
todetail(event) {
	var that =this
console.log(event.currentTarget.dataset.id)
console.log('bankuai',this.data.bankuai)
  wx.navigateTo({
      url:'/pages/detail/detail?id='+ event.currentTarget.dataset.id+'&param='+that.data.bankuai,
    }
  )
},

deleteAction(event){
  var Id = event.currentTarget.dataset.id;
  var that = this;

  wx.showModal({
    title: "提示",
    content: "确定要删除该帖子吗？",
    success(res) {
      if (res.confirm) {
        try {
          // 调用云数据库 API 删除指定 id 的帖子
          wx.cloud.database().collection(that.data.bankuai).doc(Id).remove({
            success (res) {
              console.log(res);
              // 删除成功，弹出提示框
             	 wx.showToast({
                title: "删除成功",
                icon: "none"
              });
              // 刷新页面
              	that.onLoad();
            },
            fail: function(error) {
              // 删除失败，打印错误信息
              console.error(error);
              wx.showToast({
                title: "删除失败，请重试",
                icon: "none"
              });
            }
          });
        } catch (error) {
          // 捕获异常错误
          console.error(error);
          wx.showToast({
            title: "删除出现异常错误，请重试",
            icon: "none"
          });
        }
      }
    }
  });
},
onShareAppMessage(event)
{
  console.log(event)
  console.log(this.data.actions)
  return{
    title:'Welcome to SHARE',
    imageUrl:'',
    path:'pages/index/index'
  }
},
  onPullDownRefresh() {
    // this.getActionList() 
    this.onLoad()
  }
})
