import ajax from '../../utils/req.js';

//基础商品列表
export function getListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.brand.list',
      data:values
  })
}
