String.prototype.replaceAll = function (f,t) {
  var str = String(this);
  while(str.indexOf(f) !== -1) {
    str = str.replace(f,t);
  }
  return str;
}

App({
  userInfo: {},
  maxResult: 10,
  text_currentPage: -1,
});