Page({
  onLoad: function () {
    var node = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              node.onGotUserInfo({
                detail: {
                  userInfo: res.userInfo
                }
              });
            }
          });
        }
      }
    });
  },
  onGotUserInfo: function (e) {
    getApp().userInfo = e.detail.userInfo;
    wx.reLaunch({
      url: '../index/index',
    });
  },
  onShareAppMessage: function () {
    return {
      title: "如此好笑的段子，我还是第一次听见呢~",
      path: "pages/login/login"
    }
  }
});