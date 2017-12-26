/*
* @Author: lichen
* @Date:   2017-05-10 15:38:59
* @Last Modified by:   lichen
* @Last Modified time: 2017-05-12 11:04:15
*/

'use strict';
import 'whatwg-fetch'
import 'es6-promise'

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
        let json = res.json();
        return json;
    }).then((json) => {
        if(json.code=='E_300'){
             window.location.href= '/';
        }
        jsessionid = json.sessionId;
        return json;
    });

    return result;
}
