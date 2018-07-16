import { message } from 'antd';
import qs from 'qs'
import axios from 'axios';


const defaultHeader = {
  // 'Accept': 'application/json, text/plain, */*',
  'Content-Type': 'application/x-www-form-urlencoded'
};
function request({ baseURL = '', timeout = 600000, headers = defaultHeader}) {
  const axiosinstance  = axios.create({
    baseURL,
    timeout,
    headers,
    withCredentials: true,
  })
  axiosinstance.interceptors.request.use((config) => {
    const { method, params = {} } = config;
    let { data = {}, url } = config;
    config.params = params;
    config.data = qs.stringify(data);
    config.url = url;
    return config;
  },error => {
    Promise.reject({
      message:error.message || '请求参数异常'
    })
  })
  // 请求响应拦截器
  axiosinstance.interceptors.response.use((response) => {
      const { code, message } = response.data;
      // Utils.handlerSessionTimeout(resultCode);
      // 用户登录超时统一处理
      if (code !== '0') {
        return Promise.reject({
          message: message || '服务器异常',
          // data: response.data,
        });
      }
      return response.data;
    }, error => Promise.reject({
      message: error.message || '请求失败',
    }));
    return axiosinstance;
}


const ajax = new request({baseURL:'/erpWebRest'});
export default ajax;