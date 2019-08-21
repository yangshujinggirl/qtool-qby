import ajax from '../../utils/req.js';

//c端活动列表
export function getListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.promotion.activityList',
      data:values
  })
}
//c端活动列表删除
export function getDeleteApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.promotion.activity.delete',
      data:values
  })
}
//c端活动列表撤销审核
export function getApprovalsApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.promotion.approvals.cancel',
      data:values
  })
}
//c端活动列表作废，强制结束
export function getEnableApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.promotion.activity.enable',
      data:values
  })
}
//c端活动保存活动
export function getSaveActivApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.promotion.activity.modify',
      data:values
  })
}
//c端活动信息查询
export function getBaseInfoApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.promotion.activity.query',
      data:values
  })
}
//c端活动优惠信息+商品信息
export function getMainActivInfoApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.promotion.query',
      data:values
  })
}
