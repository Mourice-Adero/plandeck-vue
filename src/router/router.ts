import { createWebHistory, createRouter } from 'vue-router'
import Login from '../pages/LoginPage.vue'
import Tasks from '../pages/TasksPage.vue'
import UserDashboard from '../pages/UserDashboard.vue'

const routes = [
  { path: '/login', component: Login },
  { path: '/', component: UserDashboard },
  { path: '/tasks', component: Tasks },
]
const router = createRouter({ history: createWebHistory(), routes })

export default router
