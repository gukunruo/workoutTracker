// 设置导航栏模板
<template>
<!-- 利用tailwind添加样式 背景为浅绿色#44ba9f 文本为白色 -->
  <header class="bg-at-light-green text-white">
    <!-- container容器，设置居中、断点，设置py-5在顶部和底部填充，px为左右填充
      将导航标签设置弹性 items-center推送到中心
      断点设置是为了适配不同的屏幕
      正常显示是flex列，如果sm:flex-row达到断点最小的时候，会变成flex行
       -->
    <nav class="container py-5 px-4 flex flex-col gap-4 items-center sm:flex-row">
      <div class="flex items-center gap-x-4">
        <img class="w-14" src="../assets/images/dumbbell-light.png" alt="logo">
        <router-link class="text-lg" :to="{name:'Home'}">Workout Tracker</router-link>
      </div>
      <!-- justify-end证明这个内容是合理结束 然后在ul中使用路由管理导航功能模块 -->
      <ul class="flex flex-1 justify-end gap-x-10">
        <!-- 命名路由的:to使用{}对象 -->
        <router-link class="cursor-pointer" :to="{name:'Home'}">首页</router-link>
        <router-link v-if="user" class="cursor-pointer" :to="{name:'Create'}">创建</router-link>
        <router-link v-if="!user" class="cursor-pointer" :to="{name:'Login'}">登录</router-link>
        <!-- 点击时来触发logout方法来实现注销 -->
        <li v-if="user" @click="logout" class="cursor-pointer">注销</li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { supabase } from "../supabase/init";
import { useRouter } from 'vue-router'
// 需要对导航栏功能进行显示和隐藏，需要使用到store
import store from "../store/index";
// 同时我们需要使用计算属性，导入之后可以在setup中定义user
import { computed } from "vue";

export default {
  setup() {
    // 3 Get user from store
    const user=computed(()=>store.state.user);
    // 1 Setup ref to router
    const router=useRouter();
    // 2 Logout function
    const logout=async()=>{
      await supabase.auth.signOut();
      // 注销后进行重定向
      router.push({name:'Home'});
    }

    return {logout,user};
  },
};
</script>
