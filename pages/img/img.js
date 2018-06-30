var util = require("../../utils/util.js");
Page({
  data: {
    body: {},
    nowView: -1,
    inputValue: 0,
    currentPage: 0,
    controlBar: false
  },
  switchControl: function () {
    this.setData({
      controlBar: !this.data.controlBar
    });
  },
  updateBody: function (res, nowView) {
    console.log(res, nowView);
    if (res.showapi_res_code === 0 &&
      res.showapi_res_body.ret_code === 0) {
      var body = res.showapi_res_body;
      body.contentlist.forEach(function (item) {
        item.ct = util.dateFormat(item.ct);
      });
      this.data.body = body;
      this.data.inputValue = 0;
      this.data.currentPage = body.currentPage;
      this.data.nowView = nowView || 0;
      this.saveData();
    }
  },
  saveData: function () {
    this.setData(this.data);
  },
  onLoad: function () {
    if(this.data.currentPage === 0) {
      util.getPage({type:2, page: 1}).then(this.updateBody.bind(this));
    }
  },
  getNextPage: function () {
    if(this.data.currentPage === this.data.body.allPages) {
      wx.showToast({
        title: '当前是最后一页',
        icon: 'none'
      });
      return ;
    }
    util.getPage({type: 2, page: this.data.currentPage + 1}).then(this.updateBody.bind(this));
  },
  getLastPage: function () {
    if (this.data.currentPage === 1) {
      wx.showToast({
        title: '当前是第一页',
        icon: 'none'
      });
      return;
    }
    util.getPage({ type: 2, page: this.data.currentPage - 1 }).then(this.updateBody.bind(this));
  },
  getNext: function () {
    if(this.data.nowView + 1 === this.data.body.contentlist.length) {
      this.getNextPage();
      return ;
    }
    this.setData({
      nowView: this.data.nowView+1
    });
  },
  getLast: function () {
    if (this.data.nowView === 0) {
      this.getLastPage();
      return;
    }
    this.setData({
      nowView: this.data.nowView - 1
    });
  },
  goView: function () {
    var value = this.data.inputValue;
    if(value < 1 || value > this.data.body.allNum) {
      wx.showToast({
        title: '请填写正确的页码',
        icon: 'none'
      });
      return ;
    }
    if(value > (this.data.currentPage - 1)*this.data.body.maxResult && 
    value <= this.data.currentPage*this.data.body.maxResult) {
      this.setData({
        nowView: (value - 1)%this.data.body.maxResult
      });
      return ;
    }
    var page = Math.floor(value/this.data.body.maxResult) + 1, 
        nowView = (value - 1)%this.data.body.maxResult;
    var node = this;
    util.getPage({type:2,page:page}).then(function (res) {
      node.updateBody(res, nowView);
    });
  },
  onInput: function (e) {
    var value = Number(e.detail.value);
    if (isNaN(value)) return '';
    this.data.inputValue = value;
  },
  onShareAppMessage: function () {
    return {
      title: "如此好笑的段子，我还是第一次听见呢~",
      path: "pages/login/login"
    }
  }
});