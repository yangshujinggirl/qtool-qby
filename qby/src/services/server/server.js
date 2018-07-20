import ajax from '../../utils/req.js'

//用户反馈列表
export function getListApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.sp.order.query',
      data:values
  })
}
//用户反馈处理(详情)
export function getBackDetailApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.feedback.detail',
      data:values
  })
}
//用户反馈处理保存
export function feedBackSaveApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.feedback.save',
      data:values
  })
}
/*----------------------------工单--------------------------------*/
//客服工单列表
export function getServerListApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.sp.order.query',
      data:values
  })
}
//新增客服工单
export function addBillApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.customservice.add',
      data:values
  })
}
//用户反馈处理(详情)
export function customserviceDetailApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.customservice.detail',
      data:values
  })
}
//用户反馈处理保存
export function customserviceSaveApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.customservice.save',
      data:values
  })
}
