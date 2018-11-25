import database from '../firebase'
import { FETCH_CATEGORIES } from '../types'

export const categoriesFetched = fetchedCategories => ({
  type: FETCH_CATEGORIES,
  fetchedCategories
})

export const fetchCategories = (username, pin) => {
  return dispatch => {
    const fetchedCategories = []
    database
      .ref('users/' + username + pin + '/categories/')
      .once('value', snapshot => {
        snapshot.forEach(data => {
          let category = data.val()
          fetchedCategories.push(category)
        })
      })
      .then(() => dispatch(categoriesFetched(fetchedCategories)))
  }
}
