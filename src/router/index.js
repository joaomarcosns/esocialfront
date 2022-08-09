import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/Auth/LoginView.vue'
import CadastraView from '../views/Auth/CadastraView.vue'
import Guard from '../services/middleware' 
import Block from '../services/blockauthentication'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    beforeEnter: Guard.auth
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    beforeEnter: Block.block
  },
  {
    path: '/cadastra',
    name: 'cadastra',
    component: CadastraView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
