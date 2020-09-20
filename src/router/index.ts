import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Login from '../views/login/Login.vue';
import Home from '../views/Home.vue';
import WebView from '../views/webview/WebView.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
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
  },
  {
    path: '/webview',
    name: 'WebView',
    component: WebView,
    children: [
      {
        path: '/webview/audition',
        name: 'Audition',
        component: () => import(/* webpackChunkName: "WebView" */ '@/views/webview/pages/audition.vue'),
        meta: {
          title: '面试日程',
          callback: {
            text: '面试记录',
            fun: ''
          }
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
