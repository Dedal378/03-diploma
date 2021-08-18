import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    alias: '/tasks',
    component: () => import('../App.vue')
  },
  {
    path: '/new',
    name: 'New',
    component: () => import('../views/New.vue')
  },
  {
    path: '/task',
    name: 'Task',
    component: () => import('../views/Task.vue')
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: () => import('../views/Tasks.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // r = 'active',
  // router-link-exact-active,
  routes
})

export default router
