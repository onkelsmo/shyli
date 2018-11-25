import { DO_AUTH, LOAD } from '../types'

const initialSate = {
  username: '',
  pin: ''
}

export default function doAuth (state = initialSate, action = {}) {
  switch (action.type) {
    case LOAD:
      if (typeof action.payload.auth !== 'undefined') {
        action.payload.auth.loaded = true
        return action.payload.auth
      }
      return Object.assign({}, state, { loaded: true })
    case DO_AUTH:
      return Object.assign({}, state, {
        username: action.username,
        pin: action.pin
      })
    default:
      return state
  }
}
