import database from '../firebase'
import { DO_AUTH } from '../types'

export const authenticationDone = (username, pin) => ({
  type: DO_AUTH,
  username,
  pin
})

export const doAuth = (username, pin) => {
  return dispatch => {
    database
      .ref('users/' + username + pin)
      .set({
        name: username,
        pin: pin
      })
      .then(() => dispatch(authenticationDone(username, pin)))
  }
}
