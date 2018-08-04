import ajax from '../../utils/req.js';

//分类列表
export function getListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.firstCategory.list',
      data:values
  })
}

//保存分类
export function goodSaveApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.categorylevel.save',
      data:values
  })
}
