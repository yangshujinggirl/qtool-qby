import ajax from '../../utils/req.js';

//商品列表
export function getListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.opd.spu.list',
      data:values
  })
}

//商品详情
export function goodsInfoApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.opd.spu.quey',
      data:values
  })
}

//保存信息
export function goodSaveApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.opd.spu.save',
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
//导出
export function exportDataApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.sys.doc.task',
      data:values
  })
}

//批量操作
export function handleSellApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.ec.pd.spu.status',
      data:values
  })
}
//商品说明列表
export function productListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.explain.list',
      data:values
  })
}
