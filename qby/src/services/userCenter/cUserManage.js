import ajax from '../../utils/req.js'

//c端用户管理列表
export function getListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.ur.user.query.toc',
      data:values
  })
}
