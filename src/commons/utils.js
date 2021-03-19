
export function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  arr = document.cookie.match(reg);
  if ( arr ){
    return unescape(arr[2]);
  }
  return null;
}
