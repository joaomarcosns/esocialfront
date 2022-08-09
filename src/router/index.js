import { createRouter, createWebHistory } from 'vue-router'
import Guard from '../services/middleware' 
import Block from '../services/blockauthentication'
import Error404View from '@/views/Errors/Error404View.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import("@/views/HomeView.vue"),
    beforeEnter: Guard.auth
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("@/views/Auth/LoginView.vue"),
    beforeEnter: Block.block
  },
  {
    path: '/cadastra',
    name: 'cadastra',
    component: () => import("@/views/Auth/CadastraView.vue"),
    beforeEnter: Block.block
  },
  // {
  //   path: '*',
  //   name: 'error',
  //   component: Error404View,
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
