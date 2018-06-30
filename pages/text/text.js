var util = require("../../utils/util.js");
Page({
  data: {
    scrollTop: 0,
    inputValue: 0,
    maxResult: 10,
    body: {}
  },
  updatePage: function (res) {
    if (res.showapi_res_code === 0 &&
      res.showapi_res_body.ret_code === 0) {
      var body = res.showapi_res_body;
      body.contentlist.forEach(function (item) {
        item.text = util.textFormat(item.text);
        item.ct = util.dateFormat(item.ct);
      });
      getApp().text_currentPage = body.currentPage;
      this.data.body = body;
      this.data.inputValue = 0;
      this.setData(this.data);
    }
    else {
      wx.showToast({
        title: res.showapi_res_error,
      });
    }
  },
  onLoad: function () {
    if (getApp().text_currentPage === -1) {
      util.getPage({type:1,page:1}).then(this.updatePage.bind(this));
    }
  },
  onInput: function (e) {
    var value = Number(e.detail.value);
    if(isNaN(value)) return '';
    this.data.inputValue = value;
  },
  getLastPage: function () {
    var currentPage = this.data.body.currentPage;
    if(currentPage === 1) return ;
    util.getPage({ type: 1, page: currentPage - 1 }).then(this.updatePage.bind(this));
  },
  getNextPage: function () {
    var currentPage = this.data.body.currentPage;
    if (currentPage === this.data.body.allPages) return;
    util.getPage({ type: 1, page: currentPage + 1 }).then(this.updatePage.bind(this));
  },
  goPage: function () {
    var page = this.data.inputValue;
    if(page === this.data.body.currentPage) return ;
    if(page < 1 || page > this.data.body.allPages) {
      wx.showToast({
        title: '请输入正确的页码',
        icon: "none"
      });
      return ;
    }
    util.getPage({type:1, page: page}).then(this.updatePage.bind(this));
  },
  onShareAppMessage: function () {
    return {
      title: "如此好笑的段子，我还是第一次听见呢~",
      path: "pages/login/login"
    }
  }
});