import ajax from '../../utils/req.js'

//B端推送列表
export function getListApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.sp.order.query',
      data:values
  })
}

//创建推送--保存
export function createBpushApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.bPush.save',
      data:values
  })
}
// 推送详情
export function bPushInfoApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.bPush.datail',
      data:values
  })
}

//撤销推送
export function bPushRevokeApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.bPush.revoke',
      data:values
  })
}
