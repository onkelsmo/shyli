import database from '../firebase'
import { FETCH_ITEMS } from '../types'

export const itemsFetched = fetchedItems => ({
  type: FETCH_ITEMS,
  fetchedItems
})

export const fetchItems = (categoryName, username, pin) => {
  return dispatch => {
    const fetchedItems = []
    database
      .ref(
        'users/' + username + pin + '/categories/' + categoryName + '/items/'
      )
      .once('value', snapshot => {
        snapshot.forEach(data => {
          let item = data.val()
          fetchedItems.push(item)
        })
      })
      .then(() => dispatch(itemsFetched(fetchedItems)))
  }
}
