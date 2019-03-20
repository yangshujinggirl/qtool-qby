import ajax from '../../utils/req.js';

//列表
export function getListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.user.st.order.query',
      data:values
  })
}
//详情
