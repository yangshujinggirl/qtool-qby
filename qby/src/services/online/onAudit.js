import ajax from '../../utils/req.js';

//待审核列表
export function getListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.ec.od.auditOrder.query',
      data:values
  })
}
//订单拆分查询
export function auditOrdeApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.ec.od.auditOrder.dismantle.query',
      data:values
  })
}
//订单拆单保存
export function saveAuditOrdeApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.ec.od.auditOrder.dismantle.save',
      data:values
  })
}
//修改价格列表
export function getPriceListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.ec.od.auditOrder.price.query',
      data:values
  })
}
//修改价格保存
export function savePriceApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.ec.od.auditOrder.price.save',
      data:values
  })
}
//合并订单
export function mergeOrderApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.ec.od.auditOrder.merge.save',
      data:values
  })
}
