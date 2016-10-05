export function getJSON(url, data){
  return new Promise(function(resolve, reject){
    $.getJSON(url, data, resolve)
  })
}

export function isEmpty(obj) {
  if(typeof obj == "array") {
    return obj.length == 0
  }

  if(typeof obj == "object") {
    if(obj == null) return true

    let keys = Object.keys(obj)
    return keys.length == 0
  }

  if(typeof obj == "string") {
    return obj == ""
  }
}

export function getStorage(key) {
  return {
    get() {
      return JSON.parse(localStorage.getItem(key))
    },
    set(value) {
      localStorage.setItem(key, JSON.stringify(value))
    },
    clear() {
      localStorage.removeItem(key)
    }
  }
}

export function urlWithParams(url, obj) {
  let keys = Object.keys(obj)
  keys.forEach((key, index) => {
    url += `${index ? "&" : "?"}${key}=${obj[key]}`
  })

  return url
}

export function deParams(url) {
  let p = url.split("?")[1]
  let s = p && p.split("#")[0]
  let r = {}

  if(!s) return r

  for(let item of s.split("&")) {
    let [key, value] = item.split("=")
    if(key.has("_")) continue
    r[key] = value
  }

  return r
}
