import ajax from '../../utils/req.js';

//分类列表
export function getListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.country.list',
      data:values
  })
}

//保存
export function goodSaveApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.country.save',
      data:values
  })
}
