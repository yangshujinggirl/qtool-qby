import { post } from '../utils/expont'

export function Getexpont(code,values) {
    const result = post('/erpWebRest/webrestExport.htm',{
         'code':code,
         'data':JSON.stringify(values)
    })
    return result
}