import { FETCH_CATEGORIES, LOAD } from '../types'

const initialSate = {}

export default function fetchCategories (state = initialSate, action = {}) {
  switch (action.type) {
    case LOAD:
      if (typeof action.payload.fetchCategories !== 'undefined') {
        action.payload.fetchCategories.loaded = true
        return action.payload.fetchCategories
      }
      return Object.assign({}, state, { loaded: true })
    case FETCH_CATEGORIES:
      return Object.assign({}, state, action.fetchedCategories)
    default:
      return state
  }
}
