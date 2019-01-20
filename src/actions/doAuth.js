import database from '../firebase'
import { DO_AUTH } from '../types'
import { fetchCategories } from './fetchCategories'

export const authenticationDone = (username, pin) => ({
  type: DO_AUTH,
  username,
  pin
})

export const doAuth = (username, pin) => {
  return dispatch => {
    let userData = []

    database
      .ref('users/' + username + pin)
      .once('value', snapshot => {
        snapshot.forEach(data => {
          let item = data.val()
          userData.push(item)
        })
      })
      .then(() => {
        if (userData.length === 0) {
          database
            .ref('users/' + username + pin)
            .set({
              name: username,
              pin: pin
            })
            .then(() => dispatch(authenticationDone(username, pin)))
        } else {
          dispatch(authenticationDone(username, pin))
          dispatch(fetchCategories(username, pin))
        }
      })
  }
}
