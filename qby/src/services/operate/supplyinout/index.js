import ajax from '../../../utils/req.js'

//发票管理 拿取数据
export function getListApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.settle.query',
      data:values
  })
}
