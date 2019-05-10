import ajax from '../../../utils/req.js';

//列表
export function getListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.spu.active.query',
      data:values
  })
}
//新增保存
export function addGoodsApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.spu.active.save',
      data:values
  })
}
