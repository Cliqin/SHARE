// pages/detail/detail.js
const util = require("../../utils/util");
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    plcaceHolder: '评论'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openid: app.globalData.openid
    })
    this.data.id = options.id
    this.getDetail()

    var that = this
    wx.cloud.database().collection('share').doc(that.data.id).get({
      success(res) {
        //console.log(res)
        var actions = res.data
        actions.time = util.formatTime(new Date(actions.time))
        that.setData({
          actions: res.data
        })
      }
    })
    try {
      var value = wx.getStorageSync('history')
      if (value) {
        var List = []
        List.push(that.data.id)
        for (var i = 0; i < value.length; i++) {
          if (that.data.id != value[i]) {
            List.push(value[i])
          }
        }
        console.log(List)
        try {
          wx.setStorageSync('history', List)
        } catch (e) {
          console.log(e)
        }
      } else {
        var List = [that.data.id]
        try {
          wx.setStorageSync('history', List)
        } catch (e) {
          console.log(e)
        }
      }
    } catch (e) {
      console.log(e)
    }
  },
  getDetail() {
    var that = this
    wx.cloud.database().collection('share').doc(that.data.id).get({
      success(res) {
        console.log(res)
        var actions = res.data
        actions.time = util.formatTime(new Date(actions.time))
        for (var l in actions.commentList) {
          actions.commentList[l].time = util.formatTime(new Date(actions.commentList[l].time))
        }
        that.setData({
          actions: res.data
        })
      }
    })
  },
  delete() {
    console.log(this.data.id)
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除此帖吗？',
      success(res) {
        if (res.confirm) {
          wx.cloud.database().collection('share').doc(that.data.id).remove({
            success(res) {
              console.log(res)
              wx.navigateBack({
                success(res) {
                  wx.showToast({
                    title: '删除成功',
                  })
                }
              })
            }
          })
        }
      }
    })
  },

  getInputValue(event) {

    console.log(event.detail.value)

    this.data.inputValue = event.detail.value

  },

  publishComment() {
    var that = this;

    if (app.globalData.userInfo == null) {
      wx.navigateTo({
        url: '/pages/home/home',
      })
    } else {
      var that = this;
      console.log(that.data.id)
      wx.cloud.database().collection('share').doc(that.data.id).get({
        success(res) {
          var actions = res.data
          var comment = {}
          comment.nickName = app.globalData.userInfo.nickName
          comment.faceImg = app.globalData.userInfo.avatarUrl
          comment.openid = app.globalData.openid
          comment.text = that.data.inputValue
          comment.time = Date.now()
          comment.toOpenid = that.data.toOpenid
          comment.toNickname = that.data.toNickname
          actions.commentList.push(comment)
          //console.log(actions)
          wx.cloud.database().collection('share').doc(that.data.id).update({
            data: {
              commentList: actions.commentList
            },
            success(res) {
              console.log(res)
              wx.showToast({
                title: '评论成功！',
              })
              that.getDetail()
              console.log(1)
              that.setData({
                inputValue: '',
                plcaceHolder: '评论',
                toOpenid: '',
                toNickname: ''
              })
            }
          })
        }
      })
    }
  },
  deleteComment(event) {

    var that = this;
    console.log(event.currentTarget.dataset.index)

    wx.showModal({
      title: '提示',
      content: '确定要删除此评论吗？',
      success(res) {
        if (res.confirm) {
          var index = event.currentTarget.dataset.index
          wx.cloud.database().collection('share').doc(that.data.id).get({
            success(res) {
              console.log(res)
              var action = res.data

              action.commentList.splice(index, 1)
              wx.cloud.database().collection('share').doc(that.data.id).update({
                data: {
                  commentList: action.commentList
                },
                success(res) {
                  console.log(res)
                  wx.showToast({
                    title: '删除成功',
                  })
                  that.getDetail()
                }
              })
            }
          })
        } else if (res.cancel) {

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
  onPullDownRefresh() {},


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(event) {
    console.log(event)

  }
})