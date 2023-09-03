<template>
  <!-- v-if="appReady"用来决定是否渲染 -->
  <div v-if="appReady" class="min-h-full font-Poppins box-border">
    <!-- 3 定义完组件，可以在此调用 -->
    <Navigation/>
    <router-view />
  </div>
</template>

<script>
// 1 导入Navigation.vue使得每个页面都使用这个导航栏
import Navigation from './components/Navigation.vue';
import {ref} from "vue";
import {supabase} from "./supabase/init";
import store from "./store/index"

export default {
  // 2 定义组件:局部注册组件
  components:{
    Navigation,
  },
  setup() {
    // Create data / vars
    const appReady=ref(null);
    // 这个值将决定上面组件的渲染

    // Check to see if user is already logged in
    const user=supabase.auth.user();

    // If user does not exist, need to make app ready
    if(!user){
      appReady.value=true;
    }

    // Runs when there is a auth state change
    // if user is logged in, this will fire
    // 因为这个还没创建，需要参考store来查看状态的改变，所以要在上面导入store包
    supabase.auth.onAuthStateChange((_,session)=>{
      console.log('hello');
      // 利用store.methods参考对象来创建setUser方法
      store.methods.setUser(session);
      appReady.value=true;
    })

    return {appReady};
  },
};
</script>

<style lang="scss">
// 导入谷歌字体
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap");
</style>
