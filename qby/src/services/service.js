import { post } from '../utils/postedit.js'

export function GetServerData(code,values) {
    const result = post('/erpWebRest/webrest.htm',{
        'code':code,
        'data':JSON.stringify(values)
    })
    return result
}