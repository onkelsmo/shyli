import database from '../firebase'
import { ADD_ITEM } from '../types'

export const itemAdded = itemName => ({
  type: ADD_ITEM,
  itemName
})

export const handleItemAdd = (itemName, categoryName, image, username, pin) => {
  console.log(image)
  // TODO: upload image and save path in database!

  return dispatch => {
    database
      .ref(
        'users/' +
          username +
          pin +
          '/categories/' +
          categoryName +
          '/items/' +
          itemName
      )
      .set({
        title: itemName
      })
      .then(() => dispatch(itemAdded(itemName)))
  }
}
