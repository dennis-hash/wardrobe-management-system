import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from "@/views/Auth/Register.vue";
import Login from "@/views/Auth/Login.vue";
import Dashboard from "@/views/Auth/Dashboard.vue";
import Landing from "@/views/Landing/Welcome.vue";
import {useAuthStore} from "@/store/auth.ts";
import AddItem from "@/views/Clothing/AddItem.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Landing,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {requiresGuest: true},
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {requiresGuest: true},
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {requiresAuth: true},
    },
    {
      path: '/add',
      name: 'add',
      component: AddItem,
      meta: {requiresAuth: true},
    },

  ],
})

router.beforeEach((to,from,next)=>{
  const auth = useAuthStore();

  if(to.matched.some(record => record.meta.requiresAuth) && !auth.isLoggedIn){
    next({name:"welcome"});
  }else if(to.matched.some(record => record.meta.requiresGuest) && auth.isLoggedIn){
    next({name:"dashboard"});

  }else {
    next();
  }


});
export default router
