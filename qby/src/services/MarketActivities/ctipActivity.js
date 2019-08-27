import ajax from '../../utils/req.js';

//c端活动列表
export function getListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.promotion.activityList.toC',
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
export function getSuppliApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.supplier.query',
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
//查询c端商品设置
export function getDiscountInfoApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.promotion.query',
      data:values
  })
}
//优惠内容新增赠品根据编码查询单条数据
export function getComplimentaryApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.promotion.pdcode.query',
      data:values
  })
}
//商品设置页面的保存
export function saveGoodsetApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.promotion.activity.rule.modify',
      data:values
  })
}
//商品设置页面的保存
export function getLogApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.promotion.journal',
      data:values
  })
}
//商品设置页面的审核
export function goAuditApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.promotion.approvals.create',
      data:values
  })
}

