import ajax from '../../utils/req.js'

//市场资源list
export function getListApi(values){
    values = JSON.stringify(values)
    return ajax.post('/webrest.htm',{
        code:'qerp.web.sp.order.query',
        data:values
    })
}
//新增人员保存
export function addStaffApi(values){
    values = JSON.stringify(values)
    return ajax.post('/webrest.htm',{
        code:'qerp.web.pd.resource.save',
        data:values
    })
}
