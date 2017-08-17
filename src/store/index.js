import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import Firebase from 'firebase'
/* Plug in Vuex store */
Vue.use(Vuex)

const config = {
  apiKey: 'AIzaSyDFHcCCf5kZ0GGwS3BXg1b5VBH9K6HrlJA',
  authDomain: 'sample-vue-project.firebaseapp.com',
  databaseURL: 'https://sample-vue-project.firebaseio.com',
  projectId: 'sample-vue-project',
  storageBucket: 'sample-vue-project.appspot.com',
  messagingSenderId: '452452626189'
}

const app = Firebase.initializeApp(config)
const db = app.database()

let usersRef = db.ref('users')

export const state = {
  users: []
}

export const actions = {
  setUsers ({
    commit
  }) {
    usersRef.once('value')
      .then(res => {
        const result = Object.keys(res.val()).map(key => {
          return res.val()[key]
        })
        commit(types.SET_USERS, result)
      })
  },
  removeUser ({
    commit,
    state
  }, id) {
    usersRef.child(id).remove()
      .then(res => {
        let newUsers = state.users.slice()
        newUsers = newUsers.filter(item => {
          return item.id !== id
        })
        commit(types.SET_USERS, newUsers)
      })
  },
  creatUser ({
    commit,
    state
  }, user) {
    usersRef.child(user.id).set(user)
      .then(res => {
        const newUsers = state.users.slice()
        newUsers.push(user)
        commit(types.SET_USERS, newUsers)
      })
  }
}

export const mutations = {
  [types.SET_USERS] (state, val) {
    state.users = val
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
