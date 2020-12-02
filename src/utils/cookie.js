export const setCookie = function (key, val, options) { //设置
  options = options || {};
  var time = "";
  if (options.expires) {
    var d = new Date();
    d.setDate(d.getDate() + options.expires);
    time = ";expires=" + d;
  }
  var path = "";
  if (options.path) {
    path = ";path=" + options.path
  }
  document.cookie = key + "=" + val + time + path;
}

export const getCookie = function (key) {   //获取
  var arr = document.cookie.split("; ");
  var v = "";
  arr.forEach((val) => {
    if (val.split("=")[0] === key) {
      v = val.split("=")[1];
    };
  })
  return v;
}

export const removeCookie = function (key, options) { //删除
  options = options || {};

  options.expires = -1;
  setCookie(key, 12321, options);
}