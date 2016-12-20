import moment from "moment"
import request from "request"
import md5 from "md5"

// 合并对象
export const extend = () => {
  var result = {}, args = arguments

  for(let i = 0; i < args.length; i++) {
    let keys = Object.keys(arguments[i])
    keys.forEach(function(item) {result[item] = args[i][item]})
  }

  return result
};

// 构造返回的json数据
export const jsonWrite = (res, ret) => {
  if(!ret) ret = {}
  if(ret.succ === undefined) ret.succ = false
  res.json(ret)
}

// 获取随机字符串
export const fetchRandomStr = len => {
  if(!len) len = 32
  var str = "00123456789abcdefghigklmnopqrstuvwxyzz", result = "";
  for(let i = 0; i < len; i++) {
    let item = str[+(Math.random() * 38).toFixed(0)];
    result += item ? item : "x";
  }
  return result
};

// 拼接url
export const fetchUrlwithParams = obj => {
  if(!obj.url) return console.err("constructParams needs obj.url is a string");
  var _url = obj.url;
  delete obj.url;

  var _keys = Object.keys(obj);
  _keys.forEach(function(item, index) {
    var _symbol = index ? "&" : "?";
    _url += `${_symbol}${item}=${obj[item]}`
  })

  return _url
};

export const getParamFromStr = str => {
  let arr = str.split("&")
  let result = {}

  arr.forEach(item => {
    const o = item.split("=")
    result[o[0]] = o[1]
  })

  return result
};

export const getNameHash = name => {
  const nameHash = md5(name + "user_name_hash")
  const hash = {
    nameHash: nameHash,
    sessionHash: md5(nameHash + "woolsontashia_session_hash"),
  }
  return hash
}