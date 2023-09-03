<template>
  <!-- 2 在创建好数据值后即可来添加标签 -->
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- 错误处理Error Handling 当存在错误时来显示错误处理 
    mb:margin bottom p:padding rounded-md:绕过md -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{errorMsg}}</p>
    </div>

    <form 
      @submit.prevent="login" 
      class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg">
      <h1 class="text-3xl text-at-light-green mb-4">登录</h1>
      
      <div class="flex flex-col mb-2">
        <label for="email" class="mb-1 text-sm text-at-light-green">邮箱</label>
        <!-- 给输入框添加required，用于验证更加轻松，无需添加自定义验证
        v-model实现双向数据绑定 -->
        <input 
          type="text"
          required class="p-2 
          text-gray-500 focus:outline-none"
          id="email"
          v-model="email"/>
      </div>

      <div class="flex flex-col mb-2">
        <label for="password" class="mb-1 text-sm text-at-light-green">密码</label>
        <input 
          type="password"
          required class="p-2 
          text-gray-500 focus:outline-none"
          id="password"
          v-model="password"/>
      </div>  

      <!-- mt:margin-top self-start:将此按钮与开始对齐 -->
      <button type="submit" class="mt-6 py-2 px-6 rounded-sm self-start text-sm
       text-white bg-at-light-green duration-200 border-solid
       border-2 border-transparent hover:border-at-light-green 
       hover:bg-white hover:text-at-light-green ">
        登录
      </button>

      <!-- 登录界面下方提示信息，转向Register -->
      <router-link class="text-sm mt-6 text-center" :to="{name:'Register'}">
        还没账号?<span class="text-at-light-green">点击注册</span>
      </router-link>
    </form>
  </div>
</template>

<script>
// 1 为了使用我们的数据，首先需要导包
// ref是vue3中的函数，ref和reactive一样都是实现响应式数据的方法，不同的是ref只能监听简单数据类型的变化
import { ref } from "vue";
import {supabase} from "../supabase/init";
import {useRouter} from "vue-router";

export default {
  name: "login",
  setup() {
    // Create data / vars 
    const router=useRouter();
    // 设置email、password和confirmPassword的ref初始值为空
    const email=ref(null);
    const password=ref(null);
    // 最后创建错误处理
    const errorMsg=ref(null);

    // Login function
    const login=async()=>{
      // 我们不需要进行验证，只需要try catch来尝试登录，如果有错误信息，输出在error div模块即可
      try{
        // 只得到错误信息
        let {error} = await supabase.auth.signIn({
          email: email.value,
          password: password.value,
        });
        if(error) throw error;
        router.push({name:"Home"});
      }catch(error){
        errorMsg.value=`Error: ${error.message}`;
        setTimeout(()=>{
          errorMsg.value=null;
        },5000)
      }
    }
    return {email,password,errorMsg,login};
  },
};
</script>
