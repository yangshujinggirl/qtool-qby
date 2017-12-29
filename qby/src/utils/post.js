import { message } from 'antd';
'use strict';
// import 'whatwg-fetch'
// import 'es6-promise'
import fetch from 'dva/fetch';

// 将对象拼接成 key1=val1&key2=val2&key3=val3 的字符串形式
function obj2params(obj) {
    var result = '';
    var item;
    for (item in obj) {
        result += '&' + item + '=' + encodeURIComponent(obj[item]);
    }

    if (result) {
        result = result.slice(1);
    }

    return result;
}
var jsessionid = '';
export function getJsessionId(){
    return jsessionid
}
// 发送 post 请求
export function post(url, paramsObj) {
    var result = fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: obj2params(paramsObj)
    }).then((res) => {
        if (res.status !== 200) {            
            return {message:'网络错误'};                   
         }


        let json = res.json();
        return json;
    }).then((json) => {
        if(json.code=='E_300'){
             window.location.href= '/';
             sessionStorage.clear();
        }
        if(json.code!='0'){
            message.error(json.message,0.8);
        }
        jsessionid = json.sessionId;
        return json;
    }).catch(function(err) {      
        return {message:'网络错误'};      
     });

    return result;
}

// 发送 post 请求
export function post2(url, paramsObj) {
    var result = fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: obj2params(paramsObj)
    }).then((res) => {
        if (res.status !== 200) {            
            return {message:'网络错误'};                   
        }
        let json = res.json();
        return json;
    }).then((json) => {
        if(json.code=='E_300'){
             window.location.href= '/';
             sessionStorage.clear();
        }
        jsessionid = json.sessionId;
        return json;
    }).catch(function(err) {      
        return {message:'网络错误'};      
    });

    return result;
}