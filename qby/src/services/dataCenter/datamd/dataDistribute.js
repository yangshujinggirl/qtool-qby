import ajax from '../../../utils/req.js'

//库存分布列表
export function getListApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.sp.shop.inv.list',
      data:values
  })
}
