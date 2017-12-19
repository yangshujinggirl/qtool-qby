import { post } from '../utils/expont'

export function Getexpont(code,values) {
    const result = post('/erpQwmsRest/qwmsrestExport.htm',{
         'code':code,
         'data':JSON.stringify(values)
    })
    return result
}