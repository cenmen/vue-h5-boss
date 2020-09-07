import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/list',
    children: [
      {
        path: '/list',
        name: 'List',
        component: () => import(/* webpackChunkName: "Home" */ '@/views/list/List.vue'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/message',
        name: 'Message',
        component: () => import(/* webpackChunkName: "Home" */ '@/views/message/Message.vue'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/user',
        name: 'User',
        component: () => import(/* webpackChunkName: "Home" */ '@/views/user/User.vue'),
        meta: {
          keepAlive: true
        }
      }
    ],
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
