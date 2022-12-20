import { createApp } from 'vue'
import router from './router.js'
import store from './store.js'
import App from './App.vue'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyDHMAIW_sqBEotsesE1Dnh0-QJGW0jVg88',
  authDomain: 'vue-pizza1.firebaseapp.com',
  databaseURL: 'https://vue-pizza1-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'vue-pizza1',
  storageBucket: 'vue-pizza1.appspot.com',
  messagingSenderId: '382629436771',
  appId: '1:382629436771:web:5b1e5fc951635248e94756'
}
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth()
// для записи данных в базу данных
const db = getDatabase()

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')

export { firebaseApp, auth, db }
