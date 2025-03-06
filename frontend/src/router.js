import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './components/pages/HomePage.vue'
import ResultPage from './components/pages/ResultPage.vue'
import NotFoundPage from './components/pages/NotFoundPage.vue'

const routes = createRouter({
  history: createWebHistory('/sd-searchPage'),
  routes: [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/result',
      component: ResultPage,
    },
    {
      path: '/:notFound(.*)',
      component: NotFoundPage,
    },
  ],
})

export default routes
