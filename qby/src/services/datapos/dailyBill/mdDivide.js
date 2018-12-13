import ajax from '../../../utils/req.js';

//用户订单列表
export function getListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.user.st.order.query',
      data:values
  })
}
//导出
export function exportDataApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.rp.share.profit.export',
      data:values
  })
}
