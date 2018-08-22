import ajax from '../../utils/req.js'

//c端推送列表
export function getListApi(values){
  values.pushType = 20;
  values = JSON.stringify(values);
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.push.list',
      data:values
  })
}

//c端推送创建推送--保存
export function createBpushApi(values){
  values.pushType = 20;
  values = JSON.stringify(values)
  console.log(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.push.save',
      data:values
  })
}
