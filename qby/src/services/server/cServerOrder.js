import ajax from '../../utils/req.js';

//列表
export function getListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.ws.bin.udeskticket',
      data:values
  })
}
//详情
export function getDetailApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.ws.bin.udeskticket.detail',
      data:values
  })
}
