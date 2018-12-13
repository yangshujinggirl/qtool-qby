import ajax from '../../../utils/req.js';

//保税分润列表
export function getListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.bondedws.profit.query',
      data:values
  })
}
