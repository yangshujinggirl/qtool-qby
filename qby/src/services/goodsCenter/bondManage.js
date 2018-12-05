import ajax from '../../utils/req.js'

//保税仓列表
export function getListApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.taxWarehouse.query',
      data:values
  })
}
export function saveBondApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.taxWarehouse.save',
      data:values
  })
}
