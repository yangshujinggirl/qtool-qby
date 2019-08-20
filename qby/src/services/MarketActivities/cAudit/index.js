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
//商品页面详情
export function goodsInfoApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.promotion.activity.rule.modify',
      data:values
  })
}
