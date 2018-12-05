import ajax from '../../utils/req.js';

//品牌列表
export function getListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.brand.list',
      data:values
  })
}
export function brandSaveApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.brand.save',
      data:values
  })
}
