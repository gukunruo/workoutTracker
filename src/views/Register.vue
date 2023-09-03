<template>
  <!-- 2 在创建好数据值后即可来添加标签 -->
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- 错误处理Error Handling 当存在错误时来显示错误处理 
    mb:margin bottom p:padding rounded-md:绕过md -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{errorMsg}}</p>
    </div>

    <!-- 注册 @submit.prevent="register" -->
    <form 
      @submit.prevent="register"
      class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg">
      <h1 class="text-3xl text-at-light-green mb-4">注册</h1>
      
      <div class="flex flex-col mb-2">
        <label for="email" class="mb-1 text-sm text-at-light-green">邮箱</label>
        <!-- 给输入框添加required，用于验证更加轻松，无需添加自定义验证
        v-model实现双向数据绑定 -->
        <input 
          type="text"
          required class="p-2 
          text-gray-500 focus:outline-none"
          id="email"
          v-model="email"
        />
      </div>

      <div class="flex flex-col mb-2">
        <label for="password" class="mb-1 text-sm text-at-light-green">密码</label>
        <input 
          type="password"
          required class="p-2 
          text-gray-500 focus:outline-none"
          id="password"
          v-model="password"
        />
      </div>  

      <div class="flex flex-col mb-2">
        <label for="confirmPassword" class="mb-1 text-sm text-at-light-green">再次确认密码</label>      
        <input 
          type="password"
          required class="p-2 
          text-gray-500 focus:outline-none"
          id="confirmPassword"
          v-model="confirmPassword"
        />
      </div>

      <!-- mt:margin-top self-start:将此按钮与开始对齐 -->
      <button type="submit" class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white
      bg-at-light-green duration-200 border-solid border-2 border-transparent 
      hover:border-at-light-green hover:bg-white hover:text-at-light-green ">
        注册
      </button>

      <!-- 注册界面下方提示信息，转向login -->
      <router-link class="text-sm mt-6 text-center" :to="{name:'Login'}">
        已有帐号?<span class="text-at-light-green">点击登录</span>
      </router-link>
    </form>
  </div>
</template>

<script>
// 1 为了使用我们的数据，首先需要导包
// ref是vue3中的函数，ref和reactive一样都是实现响应式数据的方法，不同的是ref只能监听简单数据类型的变化
import { ref } from "vue";
// 部署supabase，首先导入包
import {supabase} from "../supabase/init"
// 然后需要用路由来注册函数，实现一旦登录成功变推送到登录成功的页面
import {useRouter}from "vue-router"

export default {
  name: "register",
  setup() {
    // Create data / vars 
    const router=useRouter(); // useRouter来自上面导入的vue-router
    // 设置email、password和confirmPassword的ref初始值为空 ref()相当于reactive({value:xx})
    const email=ref(null);
    const password=ref(null);
    const confirmPassword=ref(null);
    // 最后创建错误处理
    const errorMsg=ref(null);

    // Register function，导入supabase包和router包之后便可开始创建我们的寄存器函数
    const register=async()=>{
      // 第一步便是检查，以确保password等于confirmPassword
      if(password.value===confirmPassword.value){
        try{
          // 利用supabase注册email
          const {error}=await supabase.auth.signUp({
            email:email.value,
            password:password.value,
          })
          // 如果错误，则输出错误信息
          if(error)throw error;
          // 创建对router的引用，用来跳转到登录成功后的界面，然后在上面先定义router
          router.push({name:"Login"});

        }catch(error){
          // 令errorMsg的值等于传来的error信息
          errorMsg.value=error.message;
          // 5秒后移除错误信息弹窗 间隔5秒消失
          setTimeout(()=>{
            errorMsg.value=null;
          },5000)
        }
      }
      errorMsg.value="Error:Passwords do not match";
      // setTimeout定时器，延时调用，setInterval是间隔时间调用 5秒后移除错误信息弹窗
      setTimeout(()=>{
        errorMsg.value=null;
      },5000)
    };

    return {email,password,confirmPassword,errorMsg,register};
  },
};
</script>
