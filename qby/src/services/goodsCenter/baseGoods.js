import ajax from '../../utils/req.js';

//基础商品列表
export function getListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.spu.query',
      data:values
  })
}
//商品规格
export function specificationApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.category.list',
      data:values
  })
}
//商品分类
export function goodsTypeApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.type.list',
      data:values
  })
}
