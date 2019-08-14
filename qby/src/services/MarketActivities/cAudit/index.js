import ajax from '../../../utils/req.js';

//c端审核列表
export function getListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.sp.order.query',
      data:values
  })
}