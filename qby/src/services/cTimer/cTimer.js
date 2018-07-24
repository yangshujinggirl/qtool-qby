import ajax from '../../utils/req.js'

//定时列表
export function getListApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.sp.order.query',
      data:values
  })
}

//定时保存
export function createTimerApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.task.time.save',
      data:values
  })
}
