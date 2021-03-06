import { message } from 'antd';
import qs from 'qs'
import axios from 'axios';


const defaultHeader = {
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
    if(config.headers['Content-Type']=='application/json') {
      config.data = data.data;
    } else if(config.headers['Content-Type']=='application/x-www-form-urlencoded') {
      config.data = qs.stringify(data);
    }
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
      // 用户登录超时统一处理
      if(code=='E_300'){
         window.location.href= '/';
         sessionStorage.clear();
      }
      if(code!='0'){
          message.error(message,0.8);
      }
      // if (code !== '0') {
      //   return Promise.reject(response.data);
      //   // return response.data
      // }
      return response.data;
    }, error => {
      console.log(error)
      message.error(error,0.8);
      // return Promise.reject({
      //   message: error.message || '请求失败',
      // })
    });
    return axiosinstance;
}


const req  = new request({baseURL:'/erpWebRest',headers:{
  "Content-Type":"application/json"
}});
const reqform  = new request({baseURL:'/erpWebRest',headers:{
  "Content-Type":"application/x-www-form-urlencoded"
}});
export  default{ req,reqform };
