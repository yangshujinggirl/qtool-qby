import ajax from '../../../utils/req.js';

//用户订单列表
export function getListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.user.st.order.query',
      data:values
  })
}
//用户订单详情
export function getInfoApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.user.od.order.info',
      data:values
  })
}

//导出数据
export function exportDataApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.sys.doc.task',
      data:values
  })
}
