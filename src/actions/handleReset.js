import database from '../firebase'
import { RESET } from '../types'

export const resetted = () => ({
  type: RESET
})

export const handleReset = (username, pin) => {
  return dispatch => {
    database
      .ref('users/' + username + pin)
      .set(null)
      .then(() => dispatch(resetted()))
  }
}
