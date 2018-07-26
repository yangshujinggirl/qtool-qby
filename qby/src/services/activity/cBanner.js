import ajax from '../../utils/req.js'

//c端bannerlist
export function getListApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.cbanner.list',
      data:values
  })
}
//新增banner
export function addBannerApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
    code:'qerp.web.pd.cbanner.save',
    data:values
  })
}
//修改时页面默认的数据
export function modifyCbannerApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
    code:'qerp.web.pd.cbanner.info',
    data:values
  })
}
//配置页信息
export function configCbannerApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
    code:'qerp.web.pd.banner.config.info',
    data:values
  })
}
