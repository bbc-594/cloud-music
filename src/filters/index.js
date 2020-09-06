// 添0
export const _pad = date => {
  if (date < 10) {
    return `0${date}`;
  } else {
    return date;
  }
};
// 合并歌手名
export const getAuthor = artists => {
  let ret = [];
  if (!artists) {
    return '';
  }
  artists.forEach(s => {
    ret.push(s.name);
  });
  return ret.join('/');
};
// 格式化时间(xxxxxxx)
export const formatTime = timemap => {
  if (!timemap) {
    return '00:00';
  }
  let time = new Date(timemap);
  const minute = _pad(time.getMinutes());
  const second = _pad(time.getSeconds());
  return `${minute}:${second}`;
};
// 格式化时间 (xxx)
export const formatCurTime = interval => {
  interval = interval | 0;
  const minute = (interval / 60) | 0;
  const second = _pad(interval % 60);
  return `${minute}:${second}`;
};
// 格式化日期
export const formatDate = timemap => {
  if (!timemap) {
    return;
  }
  let time = new Date(timemap);
  const Year = time.getFullYear();
  const Month = time.getMonth() + 1;
  const Day = time.getDate();
  return `${Year}年 ${Month} 月 ${Day} 日`;
};
export const numberFormat = number => {
  let num = number.toString().split('');
  if (num.length > 4) {
    num.splice(3, num.length, '万');
    return num.join('');
  }
  return number;
};
// function _pad(date) {
//   if (date < 10) {
//     return `0${date}`;
//   } else {
//     return date;
//   }
// }
