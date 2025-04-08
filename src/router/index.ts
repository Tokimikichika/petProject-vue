import { createRouter, createWebHashHistory } from 'vue-router';

import Dashboard from '../pages/Dashboard.vue';

const routes = [
  { path: '/', component: Dashboard },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
