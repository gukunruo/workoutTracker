import { createRouter, createWebHistory } from "vue-router";
// 同样需要导入supabase
import {supabase} from "../supabase/init";

import Home from "../views/Home.vue";
// 导入Login.vue和Register.vue文件
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
// 引入Create.vue
import Create from "../views/Create.vue";
// 引入ViewWorkout.vue
import ViewWorkout from "../views/ViewWorkout.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    // 我们需要添加一个title到我们的浏览器
    meta:{
      title:'Home',
      // 设置权限false，true的话router将被权限保护
      auth:false,
    }
  },
  // 导入Login.vue和Register.vue router
  {
    path: "/login",
    name: "Login",
    component: Login,    
    meta:{
      title:'Login',
      auth:false,
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,    
    meta:{
      title:'Register',
      auth:false,
    }
  },
  {
    path: "/create",
    name: "Create",
    component: Create,    
    meta:{
      title:'Create',
      auth:true,
    }
  },
  {
    // 想要动态展示界面信息，我们要在此路径后使用唯一参数/:workoutId
    path: "/view-workout/:workoutId",
    // 路由名字首字母大写
    name: "View-Workout",
    component: ViewWorkout,
    meta:{
      title:'View Workout',
      auth:false,
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Change document titles 改变标题，使用路由
router.beforeEach((to,from,next)=>{
  document.title = `${to.meta.title}|Workout Tracker`;
  next();
})

// Route guard for auth routes 确保登录账户，才能使用supabase来实现route跳转
router.beforeEach((to,from,next)=>{
  const user =supabase.auth.user();
  if(to.matched.some((res)=>res.meta.auth)){
    if(user){
      next();
      return
    }
    next({name:'Login'});
    return
  }
  next()
})

export default router;
