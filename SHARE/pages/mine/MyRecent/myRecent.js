// pages/mine/myRecent.js
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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

    var value = wx.getStorageSync('history')

    if (value) {
    //var collectionNames =['bisai','jiuye','kaogong','kaoyan']
    let action=[]
      var tmpList = []
      // for (let i = 0; i < value.length; i++) {
      //   Promise.all(collectionNames.map(name=>{
      //     return db.collection(name).doc(value[i]).get()
      //   })).then (results=>{action=action.concat(results.data)})
        // db.collection('share')
        //   .doc(value[i])
        //   .get()
        //   .then((res) => {
        //     tmpList[i] = res.data
        //     wx.stopPullDownRefresh()
        //     this.setData({
        //       actionList: tmpList
        //     })
        // wx.stopPullDownRefresh()

      for (let i = 0; i < value.length; i++) {
        const db = wx.cloud.database()
        db.collection(value[i][1])
          .doc(value[i][0])
          .get()
          .then((res) => {
            tmpList[i] = res.data
            tmpList[i]['bankuai'] = value[i][1]
            wx.stopPullDownRefresh()
            this.setData({
              actionList: tmpList
            })
            console.log(this.data.actionList)
            wx.stopPullDownRefresh()
          })
          .catch(console.error)
      }
		}
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
    console.log(event)
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + event.currentTarget.dataset.id + '&bankuai=' + event.currentTarget.dataset.bankuai,
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