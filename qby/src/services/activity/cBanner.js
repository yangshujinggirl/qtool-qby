import ajax from '../../utils/req.js'

//c端bannerlist
export function getListApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.sp.order.query',
      data:values
  })
}
//新增banner
export function addBannerApi(){
  values = JSON.stringify(values)
  return ajax.post('',{
    code:'',
    data:values
  })
}
