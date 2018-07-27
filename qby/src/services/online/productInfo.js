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
