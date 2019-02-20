import 'babel-polyfill'
import Vue from 'vue'
import Router from 'vue-router'
import CustomerAddress from '@/views/CustomerAddress'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'customerAddress',
      component: CustomerAddress
    }
  ]
})
