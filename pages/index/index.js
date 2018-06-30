Page({
  data: {
    userInfo: {},
  },
  onLoad: function () {
    this.setData({
      userInfo: getApp().userInfo
    });
  },
  onShareAppMessage: function () {
    return {
      title: "如此好笑的段子，我还是第一次听见呢~",
      path: "pages/login/login"
    }
  }
});