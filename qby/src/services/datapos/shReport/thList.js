import ajax from '../../../utils/req.js';

//退货列表
export function getListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.order.returnRep',
      data:values
  })
}
//退货详情
export function getDetail(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.order.returnRepDetail',
      data:values
  })
}
