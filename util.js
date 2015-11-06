export function getJSON(url, data){
  return new Promise(function(resolve, reject){
    $.getJSON(url, data, resolve)
  })
}