import ajax from '../../utils/req.js';



//商品分类
export function getCategoryApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.category.list',
      data:values
  })
}
