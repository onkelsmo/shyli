import { DO_AUTH } from '../types'

const initialSate = {
  username: '',
  pin: ''
}

export default function doAuth (state = initialSate, action = {}) {
  switch (action.type) {
    case DO_AUTH:
      return Object.assign({}, state, {
        username: action.username,
        pin: action.pin
      })
    default:
      return state
  }
}
