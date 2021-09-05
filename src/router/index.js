import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    alias: '/tasks',
    component: () => import('@/views/Tasks.vue'),
  },
  {
    path: '/new',
    name: 'New',
    component: () => import('@/views/New.vue'),
  },
  {
    path: '/task/:id?',
    name: 'Task',
    props: true,
    component: () => import('@/views/Task.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes
})

export default router