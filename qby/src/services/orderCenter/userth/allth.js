import ajax from '../../../utils/req.js';

//用户退单列表
export function getListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.order.return.query',
      data:values
  })
}
//确认收货
export function sureGetApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.order.return.confirm',
      data:values
  })
}

//强制取消
export function forceCancelApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.order.return.cancel',
      data:values
  })
}
//订单详情
export function getInfoApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.order.return.detail',
      data:values
  })
}
//根据订单查详情
export function getOrderInfoApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.order.detail.query',
      data:values
  })
}
//新建订单
export function saveThApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.order.return.save',
      data:values
  })
}
