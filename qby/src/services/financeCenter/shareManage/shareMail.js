import ajax from '../../../utils/req.js';

//用户订单列表
export function getListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.directDelivery.profit.query',
      data:values
  })
}
