import ajax from '../../utils/req.js'

//定时列表
export function getListApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.qpos.pd.unreceived.query',
      data:values
  })
}
