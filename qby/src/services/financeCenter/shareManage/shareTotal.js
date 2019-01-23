import ajax from '../../../utils/req.js';

//分润合计列表
export function getListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.share.profitsum.query',
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
