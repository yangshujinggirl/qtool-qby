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
export function createcPushApi(values){
  values.pushType = 20;
  values = {bsPush:values}
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.push.save',
      data:values
  })
}
//c端推送创建推送--保存
export function cpushInfoApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.push.detail',
      data:values
  })
}
