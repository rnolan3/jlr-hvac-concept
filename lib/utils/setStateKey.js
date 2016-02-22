export default function setKey (state, key, value) {
  let tmpObj = {}
  tmpObj[key] = value
  return Object.assign({}, state, tmpObj)
}
