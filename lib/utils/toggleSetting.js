import setStateKey from './setStateKey'

export default function toggleSetting (state, key) {
  return setStateKey(state, key, !state[key])
}
