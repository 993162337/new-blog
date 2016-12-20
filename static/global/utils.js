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

  if(obj == null || obj == undefined) {
    return true
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

export function Msg(msg, type = "tip") {
  const types = ["tip", "warn", "error"]
  if(!types.has(type)) console.warn("Utils Msg's type is One of ", types)

  const previousZIndex = $(".global-top-msg").last().css("zIndex") || 3000
  const zIndex = parseInt(previousZIndex) + 1
  const content = `<div class="global-top-msg ${type}">${msg}</div>`
  const $div = $(content).appendTo("body").css("zIndex", zIndex)

  setTimeout(() => $div.remove(), 2500)
}
