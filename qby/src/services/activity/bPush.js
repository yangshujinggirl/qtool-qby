import ajax from '../../utils/req.js'

//B端推送列表
export function getListApi(values){
  values.pushType = 10;
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.push.list',
      data:values
  })
}

//B端推送创建推送--保存
export function createBpushApi(values){
  values.pushType = 10;
  values = {bsPush:values}
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.push.save',
      data:values
  })
}
//B端推送创建推送--保存
export function bpushInfoApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.push.detail',
      data:values
  })
}
