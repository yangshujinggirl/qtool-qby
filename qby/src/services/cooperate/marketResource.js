import Ajax from '../../utils/req.js'

const ajax = new Ajax({baseURL:'/erpWebRest'})

export function getListApi(values){
    debugger
    values = JSON.stringify(values)
    return ajax.post('/webrest.htm',{
        code:'qerp.web.pd.resource.query',
        data:values
    })
}