import { post } from '../utils/post'

export function GetServerData(code,values) {
    const result = post('/erpWebRest/webrest.htm',{
        'code':code,
        'data':JSON.stringify(values)
    })
    return result
}