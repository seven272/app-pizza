import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/Index.vue'
import Login from '@/views/Login.vue'
import Cart from '@/views/Cart.vue'
import Popup from '@/views/Popup.vue'
import Orders from '@/views/Orders.vue'
import Profile from '@/views/Profile.vue'
import Register from '@/views/Register.vue'
import Page404 from '@/views/Page404.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Index, alias: '/home', meta: { layout: 'DefaultLayout' } },
    { path: '/login', component: Login, meta: { layout: 'EmptyLayout' } },
    { path: '/popup', component: Popup, meta: { layout: 'EmptyLayout' } },
    { path: '/register', component: Register, meta: { layout: 'EmptyLayout' } },
    { path: '/cart', component: Cart, meta: { layout: 'AuthLayout' } },
    { path: '/orders', component: Orders, meta: { layout: 'AuthLayout' } },
    { path: '/profile', component: Profile, meta: { layout: 'AuthLayout' } },
    { path: '/:notFound(.*)', component: Page404, meta: { layout: 'EmptyLayout' } }
  ]
  // linkActiveClass: 'active',
  // linkExactActiveClass: 'active'
})
