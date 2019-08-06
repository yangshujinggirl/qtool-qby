import ajax from '../../utils/req.js';

//商品信息
export function getGoodsInfoApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.check.detail.query',
      data:values
  })
}
//订单日志
export function getLogoInfoApi(values) {
    values = JSON.stringify(values)
    return ajax.post('/webrest.htm',{
        code:'qerp.web.pd.check.record.query',
        data:values
    })
  }