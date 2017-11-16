export function cloneObj(obj) {
    var newObj = {}
    for(var prop in obj) {
      newObj[prop] = obj[prop]
    }
    return newObj
}