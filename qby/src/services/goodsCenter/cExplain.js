import ajax from '../../utils/req.js'

//新增说明列表
export function getListApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.explain.query',
      data:values
  })
}
//新增说明
export function saveExplainApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.explain.save',
      data:values
  })
}
