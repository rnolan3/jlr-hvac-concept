/**
 * Immutable state utilities
 */

/**
 * Set a value on a get in an immutable object.
 * @param {Object} state The immutable object
 * @param {String} key   Key in the immutable object
 * @param {Any}    value New value to be set.
 * @return {Object}      Mutated object
 */
export function setKey (obj, key, value) {
  let tmpObj = {}
  tmpObj[key] = value
  return Object.assign({}, obj, tmpObj)
}

/**
 * Creates a copy of the immutable object and toggles a boolean key.
 * @param  {Object} state The immutable object
 * @param  {String} key   [description]
 * @return {Object}       Mutated object
 */
export function toggleSetting (obj, key) {
  return setKey(obj, key, !obj[key])
}
