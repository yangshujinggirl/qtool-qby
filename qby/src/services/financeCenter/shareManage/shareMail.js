import ajax from '../../../utils/req.js';

//直邮分润列表
export function getListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.directDelivery.profit.query',
      data:values
  })
}
//导出
export function exportDataApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.sys.doc.task',
      data:values
  })
}
