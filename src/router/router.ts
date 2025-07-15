import { createWebHistory, createRouter } from 'vue-router'
import Login from '../pages/LoginPage.vue'
import Tasks from '../pages/TasksPage.vue'
import Dashboard from '../pages/UserDashboard.vue'
import DashboardLayout from '@/pages/DashboardLayout.vue'
import UserProfile from '@/components/UserProfile.vue'

const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: DashboardLayout,
    children: [
      { path: '', component: Dashboard },
      { path: '/tasks', component: Tasks },
      { path: '/profile', component: UserProfile },
    ],
  },
]
const router = createRouter({ history: createWebHistory(), routes })

export default router
