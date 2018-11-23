import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage'
import { composeWithDevTools } from 'redux-devtools-extension'
import { LOCAL_STORAGE_LIFETIME_SET, LOAD, RESET } from '../types'
import auth from './auth'

const engine = createEngine('local-storage-0')
const STORAGE_LIFETIME = 600

function localStorageReducer (
  state = {
    lifetime: STORAGE_LIFETIME,
    validUntil: false,
    isSet: false,
    loaded: false
  },
  action
) {
  switch (action.type) {
    case LOAD:
      return Object.assign({}, state, action.payload, { loaded: true })
    case LOCAL_STORAGE_LIFETIME_SET:
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}

const appReducer = combineReducers({
  localStorageStore: localStorageReducer,
  auth
})

const rootReducer = (state, action) => {
  switch (action.type) {
    case RESET:
      console.log('State and localstorage resetted!')
      engine.save({})
      return {
        auth: {
          username: '',
          pin: ''
        }
      }
    default:
    // Nothing yet
  }

  return appReducer(state, action)
}

const middlewareStorage = storage.createMiddleware(engine)
const middlewares = [thunk, middlewareStorage]

const middleware = applyMiddleware(...middlewares)
const store = createStore(rootReducer, composeWithDevTools(middleware))

// Load the store from the storage
const load = storage.createLoader(engine)
load(store)
  .then(LoadedState => {
    console.log('Loaded state:')
    console.log(LoadedState)
  })
  .catch(e => {
    console.log('Failed to load previous state:')
    console.log(e)
  })

export default store
