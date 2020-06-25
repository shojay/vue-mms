import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/classic",
  },
  {
    path: "/classic",
    name: "classic",
    meta: {
      keepAlive: true,
    },
    component: () =>
      import(/* webpackChunkName: "classic" */ "../views/classic.vue"),
  },
  {
    path: "/classic/:id/:type",
    name: "class-detail",
    component: () =>
      import(
        /* webpackChunkName: "classic-detail" */ "../views/classic-detail.vue"
      ),
  },
  {
    path: "/book",
    name: "book",
    component: () => import(/* webpackChunkName: "book" */ "../views/book.vue"),
  },
  {
    path: "/book/:id",
    name: "book-detail",
    component: () =>
      import(/* webpackChunkName: "book-detail" */ "../views/book-detail.vue"),
  },
  {
    path: "/my",
    name: "my",
    component: () => import(/* webpackChunkName: "my" */ "../views/my.vue"),
  },
  // {
  //   path: '/',
  //   name: '',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
