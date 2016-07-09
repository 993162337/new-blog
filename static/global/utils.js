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
