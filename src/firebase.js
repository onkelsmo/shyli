import firebase from 'firebase'
import 'firebase/database'
import { DB_CONFIG } from './Config'

firebase.initializeApp(DB_CONFIG)
const database = firebase.database()

export default database
