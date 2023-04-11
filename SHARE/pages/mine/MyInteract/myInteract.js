// pages/mine/myInteract.js
var app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actionList:[],
    default_img: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
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
    var that =this
    const db = wx.cloud.database()
    var collectionNames =['bisai','jiuye','kaogong','kaoyan']
    let action=[] 
    Promise.all(collectionNames.map(name=> {
      return db.collection(name).orderBy('time','desc').where ({
        prizeList:{$elemMatch:{openid:app.globalData.openid}}
      }).get()      
    })).then (results=> {
      for(let i=0;i<results.length;i++){
        action=action.concat(results[i].data)
      }
      console.log(action)
      this.setData({
        actionList:action

      })
      wx.stopPullDownRefresh()
    })
  
    // db.collection('app.mould').orderBy('time', 'desc')
    // .where({
    //         prizeList:{$elemMatch:{openid:app.globalData.openid}}
      // prizeList:db.command.all([
      //   app.globalData.openid,
        //  options:'i',
      // ])
      // prizeList:{$exists:true,$not:{$size:0,}},
//       查询 prizeList 数组中包含 openid 字段值等于 app.globalData.openid 的元素的文档。
// 其中 $elemMatch 表示元素匹配符，用于对数组中的元素进行筛选和匹配。

    // })
    // .get()
    // .then(res => {
    //   console.log(res.data)
    //   console.log(app.globalData.openid)
    //   this.setData({
    //     actionList: res.data
    //   })
    //   wx.stopPullDownRefresh()
    // })
    // .catch(console.error)
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

      url: '/pages/detail/detail?id=' + event.currentTarget.dataset.id+'&param='+event.currentTarget.dataset.param,
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