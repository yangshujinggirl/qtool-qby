import ajax from '../../../utils/req.js';



//查询tab Api
export function getSearchTabApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.config.pdFlowTab.query',
      data:values
  })
}
//查询商品 Api
export function getSearchGoodApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.config.pdFlowSpu.query',
      data:values
  })
}
//商品分类
export function getCategoryApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.category.list',
      data:values
  })
}
//保存
export function getSaveApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.config.pdFlow.add',
      data:values
  })
}
//根据id查商品；
export function getSearchIdApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.app.mlspu.query',
      data:values
  })
}
//根据id查商品；
export function getAddApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.config.pdFlow.catalog.add',
      data:values
  })
}
