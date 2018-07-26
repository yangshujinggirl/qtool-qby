import ajax from '../../utils/req.js';

//分类列表
export function getListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.spu.query',
      data:values
  })
}

//商品信息
export function goodsInfoApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.spu.info',
      data:values
  })
}

//保存分类
export function goodSaveApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.spu.save',
      data:values
  })
}
