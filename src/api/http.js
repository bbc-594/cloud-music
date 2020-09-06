import axios from 'axios';
// import router from '../router';
// import { message } from 'ant-design-vue';
/*
 * 跳转登录页
 */

const baseURL = '/api';

const service = axios.create({
  baseURL,
  headers: {
    get: {
      // get请求头配置
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    post: {
      // post请求头配置
      'Content-Type': 'application/json;charset=utf-8'
    }
  },
  timeout: 30000
});
// 请求拦截
service.interceptors.request.use(
  config => {
    // 可在此添加loading
    return config;
  },
  error => {
    // 对错误进行相应
    return Promise.resolve(error);
  }
);
// 对不同响应码设置信息
// const showStatus = (status) => {
//   let message = '';
//   // 这一坨代码可以使用策略模式进行优化
//   switch (status) {
//   case 400:
//     message = '请求错误(400)';
//     break;
//   case 401:
//     message = '未授权，请重新登录(401)';
//     break;
//   case 403:
//     message = '拒绝访问(403)';
//     break;
//   case 404:
//     message = '请求出错(404)';
//     break;
//   case 408:
//     message = '请求超时(408)';
//     break;
//   case 500:
//     message = '服务器错误(500)';
//     break;
//   case 501:
//     message = '服务未实现(501)';
//     break;
//   case 502:
//     message = '网络错误(502)';
//     break;
//   case 503:
//     message = '服务不可用(503)';
//     break;
//   case 504:
//     message = '网络超时(504)';
//     break;
//   case 505:
//     message = 'HTTP版本不受支持(505)';
//     break;
//   default:
//     message = `连接出错(${status})!`;
//   }
//   return `${message}，请检查网络或联系管理员！`;
// };
// 响应拦截
service.interceptors.response.use(
  res => {
    // if (status < 200 || status >= 300) {
    //   // 处理http错误,
    //   showStatus(data.errno);
    // }
    return res;
  },
  error => {
    return Promise.resolve(error.response);
  }
);

// const notify = (type, msg, duration = 3) => {
//   message[type](msg, duration);
// };
export default service;
