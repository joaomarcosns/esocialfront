import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/Auth/LoginView.vue'
import CadastraView from '../views/Auth/CadastraView.vue'
import Guard from '../services/middleware' 

const routes = [
  {
    path: '/',
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
    component: LoginView
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
