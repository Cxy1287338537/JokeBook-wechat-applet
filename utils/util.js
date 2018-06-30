function getPage (options) {
  return new Promise(function (resolve, reject) {
    wx.showLoading({
      title: '加载中',
    });
    try {
      wx.request({
        url: `https://route.showapi.com/341-${options.type}`,
        data: {
          showapi_appid: 68354,
          showapi_sign: "255dd762226b4cb689d9b5c244374e81",
          page: options.page,
          maxResult: getApp().maxResult
        },
        success: function (res) {
          resolve(res.data);
        },
        complete: function () {
          wx.hideLoading();
        }
      });
    } catch (e) {
      wx.hideLoading();
      reject(e);
    }
  });
}

function textFormat (str) {
  str = str.replaceAll('<br>', '\n');
  str = str.replaceAll('<br />', '\n');
  str = str.replaceAll('\r\n', '\n');
  return str;
}

function dateFormat (str) {
  return str.substr(0,10);
}

module.exports = {
  getPage, textFormat,dateFormat
};