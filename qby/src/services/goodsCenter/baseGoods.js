import ajax from '../../utils/req.js';

//基础商品列表
export function getListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.basepd.spu.query',
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
//商品规格
export function goodsTypeApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.type.list',
      data:values
  })
}
//品牌
export function goodsBrandApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.brand.search',
      data:values
  })
}
//国家
export function getCountryListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.country.list',
      data:values
  })
}
//商品信息
export function goodsInfoApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.bopd.spu.quey',
      data:values
  })
}
//查询规格1
export function searchValApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.typeval.list',
      data:values
  })
}
//保存规格1
export function saveValApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.typeval.save',
      data:values
  })
}
//保存信息线上
export function goodSaveApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.bopd.spu.save',
      data:values
  })
}
//保存信息线下
export function goodSaveOutLineApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.bupd.spu.save',
      data:values
  })
}
//日志
export function getLogListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.spulog.list',
      data:values
  })
}

//保税仓库列表
export function getWareListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.taxWarehouse.list',
      data:values
  })
}
