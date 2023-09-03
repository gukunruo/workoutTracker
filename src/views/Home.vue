<template>
  <div v-if="dataLoaded" class="container mt-10 px-4">
    <!-- 没有数据时显示No Data -->
    <div v-if="data.length === 0" class="w-full flex flex-col items-center">
      <h1 class="text-2xl">目前还没有运动信息...</h1>
      <!-- 路由链接 记得name大小写 -->
      <router-link
        class="mt-6 py-2 px-6 rounded-sm  text-sm
      text-white bg-at-light-green duration-200 border-solid
        border-2 border-transparent hover:border-at-light-green hover:bg-white
      hover:text-at-light-green"
        :to="{ name: 'Create' }">
        创建运动
      </router-link>
    </div>

    <!-- 数据Data v-else如果不显示上面的No Data模块则显示此模块，反之
        grid：display:grid 使用网格，grid-cols-num是根据最小宽度来决定  -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <!-- 通过v-for="(workout, index) in data"遍历data中的运动数据 -->
      <router-link
        class="flex flex-col items-center bg-light-grey p-8 shadow-md cursor-pointer"
        :to="{name: 'View-Workout',params:{workoutId: workout.id}}"
        v-for="(workout, index) in data"
        :key="index">
        <!-- Cardio Img -->
        <img
          v-if="workout.workoutType === 'cardio'"
          src="@/assets/images/running-light-green.png"
          class="h-24 w-auto"
          alt=""/>

        <!-- Strength Training -->
        <img
          v-else
          src="@/assets/images/dumbbell-light-green.png"
          class="h-24 w-auto"
          alt=""/>

        <p class="mt-6 py-1 px-3 text-xs text-white bg-at-light-green shadow-md rounded-lg">
          {{ workout.workoutType }}
        </p>

        <h1 class="mt-8 mb-2 text-center text-xl text-at-light-green">
          {{ workout.workoutName }}
        </h1>
      </router-link>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue';
import {supabase} from '../supabase/init';

export default {
  name: "Home",
  components: {},
  setup() {
    // Create data / vars
    // data将作为supabase中数据输出
    const data=ref([]);
    const dataLoaded=ref(null); //数据加载

    // Get data 创建函数 从我们的supabase获取数据
    const getData=async()=>{
      try{
        const {data: workouts,error}= await supabase.from('workouts').select('*');
        if(error)throw error;
        data.value=workouts;
        dataLoaded.value=true;
        // console.log(data.value); 这个只是为了测试，利用警告信息控制台打印获取的数据data.value，查看是否获取到了数据
      }
      // 这里的错误输出我们的登陆注册 要做的是控制台打印那个认股权证
      // 如果你想继续并设置一些更高级的随意处理此文件的错误
      catch(error){
        // 控制台打印警告
        console.warn(error.message);
      }
    }

    // Run data function
    getData();

    return {data,dataLoaded};
  },
};
</script>
