import { post } from '../utils/post';
import { post2} from '../utils/post';
export function GetServerData(code,values) {
    const result = post('/erpWebRest/webrest.htm',{
        'code':code,
        'data':JSON.stringify(values)
    })
    return result
}

export function GetServerData2(code,values) {
    const result = post2('/erpWebRest/webrest.htm',{
        'code':code,
        'data':JSON.stringify(values)
    })
    return result
}

export function GetServerData2(code,values) {
    const result = post2('/erpWebRest/webrest.htm',{
        'code':code,
        'mbPdSpuLog':JSON.stringify(values)
    })
    return result
}