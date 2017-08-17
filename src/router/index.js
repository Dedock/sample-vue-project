import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/index'
import User from '@/components/User/index'
import AddUser from '@/components/AddUser/index'

Vue.use(Router)

const scrollBehavior = function (to, from, savedPosition) {
  if (!savedPosition) {
    return {x: 0, y: 0}
  }
  return savedPosition
}

const routes = [
  {
    path: '/',
    name: 'Main Page',
    component: Main
  }, {
    path: ':id',
    name: 'User',
    component: User
  },
  {
    path: 'add',
    name: 'Add User',
    component: AddUser
  }
]

const router = new Router({mode: 'history', scrollBehavior, routes: routes})

export default router
