import { FETCH_ITEMS, LOAD } from '../types'

const initialSate = {}

export default function fetchItems (state = initialSate, action = {}) {
  switch (action.type) {
    case LOAD:
      if (typeof action.payload.fetchItems !== 'undefined') {
        action.payload.fetchItems.loaded = true
        return action.payload.fetchItems
      }
      return Object.assign({}, state, { loaded: true })
    case FETCH_ITEMS:
      return action.fetchedItems
    default:
      return state
  }
}
