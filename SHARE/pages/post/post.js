
// var app = getApp();
 let input_title=''
 let content=''
Page({  
 
  data:{
  
    imgList:[]
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

  viewImage(e) {
    console.log(e)
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
      // urls: ['https://storage.360buyimg.com/channel2022/jd_home/0.0.2/assets/sprite/header/sprite.png'],
      // current: 'https://storage.360buyimg.com/channel2022/jd_home/0.0.2/assets/sprite/header/sprite.png'
    });
    // https://storage.360buyimg.com/channel2022/jd_home/0.0.2/assets/sprite/header/sprite.png
    // console.log(e.currentTarget.dataset.url.tempFilePath)
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

  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  oninput(event){

    content=event.detail.value
   // console.log(content)
  },
  sendtitle(event){
    input_title=event.detail.value
  },
   sendcomment(){
    const db=wx.cloud.database()
    db.collection("share").add({
      data:{
        input_title,
        content,
      }
    })
    .then((res)=>{
      wx.hideLoading()
      wx.showToast({
        title: '发布成功',
      })
    })
   }
  


})