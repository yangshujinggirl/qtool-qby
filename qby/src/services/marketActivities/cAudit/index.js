import ajax from '../../../utils/req.js';

//c端审核列表
export function getListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.promotion.approvals.clist',
      data:values
  })
}
//基本信息的詳情
export function baseInfoApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:' qerp.web.promotion.activity.modify',
      data:values
  })
}
//审核保存
export function saveAuditApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.promotion.approvals.Opinions',
      data:values
  })
}
//审核日志
export function auditLogApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.promotion.approvals.journal',
      data:values
  })
}
