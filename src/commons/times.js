export function timeFormat(timestamp) {
  let mistiming = Math.round((Date.now() - timestamp) / 1000);
  let arrr = ['年', '个月', '星期', '天', '小时', '分钟', '秒'];
  let arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1];
  for (let i = 0; i < arrn.length; i++) {
    let inm = Math.floor(mistiming / arrn[i]);
    if (inm != 0) {
      return inm + arrr[i] + '前';
    }
  }
}