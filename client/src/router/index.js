import Vue from 'vue'
import Router from 'vue-router'
import Products from '../components/Products'
import Product from '../components/Product'
import Checkout from '../components/Checkout'
import Category from '../components/Category'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Products
    },
    {
      path: '/product/:id',
      name: 'product',
      component: Product,
      props: true
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    },
    {
      path: '/category/:category',
      name: 'category',
      component: Category
    }
  ],
  mode: 'history'
})
