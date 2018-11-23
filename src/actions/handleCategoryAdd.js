import database from '../firebase'
import { ADD_CATEGORY } from '../types'

export const categoryAdded = categoryName => ({
  type: ADD_CATEGORY,
  categoryName
})

export const handleCategoryAdd = (categoryName, username, pin) => {
  return dispatch => {
    database
      .ref('users/' + username + pin + '/categories/' + categoryName)
      .set({
        name: categoryName
      })
      .then(() => dispatch(categoryAdded(categoryName)))
  }
}
