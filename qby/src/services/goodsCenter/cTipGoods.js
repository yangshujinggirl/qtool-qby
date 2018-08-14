import ajax from '../../utils/req.js';

//商品列表
export function getListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.cpd.spu.list',
      data:values
  })
}

//商品信息
export function goodsInfoApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.cpd.spu.query',
      data:values
  })
}

//保存信息
export function goodSaveApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.cpd.spu.save',
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
//操作上线
export function handleSellApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.cspu.status',
      data:values
  })
}
//操作上新
export function handleNewApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.spu.statusnew',
      data:values
  })
}
//操作上热
export function handleHotApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.spu.statushot',
      data:values
  })
}
