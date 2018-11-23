import ajax from '../utils/req.js'

//市场资源list
export function getTaxRateApi(values){
    values = JSON.stringify(values)
    return ajax.post('/webrest.htm',{
        code:'qerp.web.ws.asn.query',
        data:values
    })
}
