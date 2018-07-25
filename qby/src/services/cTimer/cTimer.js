import ajax from '../../utils/req.js'

//定时列表
export function getListApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.ctask.time.query',
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
//定时修改
export function modifyTimerApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.cpd.task.time.query',
      data:values
  })
}
