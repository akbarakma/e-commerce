import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue';
import Admin from '../views/Admin.vue';
import AddProduct from '../views/AddProduct.vue';
import EditProduct from '../views/EditProduct.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true }
  },
  {
    path: '/add',
    name: 'AddProduct',
    component: AddProduct,
    meta: { requiresAuth: true }
  },
  {
    path: '/edit',
    name: 'EditProduct',
    component: EditProduct,
    meta: { requiresAuth: true }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
