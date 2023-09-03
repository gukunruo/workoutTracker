<template>
  <div class="max-w-screen-md mx-auto px-4 py-10">
    <!-- 状态信息和错误信息，如果存在都会显示 -->
    <div
      v-if="statusMsg || errorMsg"
      class="mb-10 p-4 bg-light-grey rounded-md shadow-lg">
      <p class="text-at-light-green">
        {{ statusMsg }}
      </p>
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!-- 创建的界面 -->
    <div class="p-8 flex items-start bg-light-grey rounded-md shadow-lg">
      <!-- 登录表格form 注册@submit.prevent="createWorkout"，用于添加提交的事件监听器（prevent防止默认） -->
      <form @submit.prevent="createWorkout" class="flex flex-col gap-y-5 w-full">
        <h1 class="text-2xl text-at-light-green">创建运动</h1>

        <!-- Workout Name -->
        <div class="flex flex-col">
          <label for="workout-name" class="mb-1 text-sm text-at-light-green">运动名称</label>
          <!-- v-model来实现双向数据绑定 给输入框添加required，用于验证更加轻松，无需添加自定义验证 -->
          <input
            type="text"
            required
            class="p-2 text-gray-500 focus:outline-none"
            id="workout-name"
            v-model="workoutName"/>
        </div>

        <!-- Workout Type -->
        <div class="flex flex-col">
          <label for="workout-type" class="mb-1 text-sm text-at-light-green">运动类型</label>
          <!-- 使用select选择框 -->
          <select
            id="workout-type"
            class="p-2 text-gray-500 focus:outline-none"
            required
            @change="workoutChange"
            v-model="workoutType">
            <!-- 在select中放三个option，第一个为默认显示 value值是表单被提交时发送到服务器的值 -->
            <option value="select-workout">选择运动</option>
            <option value="strength">力量训练</option>
            <option value="cardio">有氧训练</option>
          </select>
        </div>

        <!-- Strength Training Inputs力量训练输入框，通过v-if来控制显示 flex-col控制大容器里的内容条竖直排列在一列 -->
        <div v-if="workoutType === 'strength'" class="flex flex-col gap-y-4">
          <!-- 此时的flex-col控制单个内容条内呈水平排列在一行 v-for作用列表渲染（遍历数组） 
          在每个内容条前面还需要添加删除按钮 md:flex-row设置media最小宽度为768px，小于时候将弹性方向设置为行 -->
          <div
            class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row"
            v-for="(item, index) in exercises" :key="index">
            <!-- 此处div设计为了做专栏 flex-col来控制内容条中一个选项输入框竖直排列在一列 -->
            <div class="flex flex-col md:w-1/3">
              <label for="exercise-name" class="mb-1 text-sm text-at-light-green">
                锻炼名称
              </label>
              <input
                required
                type="text"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.exercise"/>
                <!-- v-model="item.exercise"是在上方遍历item对象的exercise -->
            </div>
            <!-- sets集合，几组 -->
            <div class="flex flex-col flex-1">
              <label for="sets" class="mb-1 text-sm text-at-light-green">组 </label>
              <input
                required
                type="text"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.sets"/>
            </div>
            <!-- reps次数 -->
            <div class="flex flex-col flex-1">
              <label for="reps" class="mb-1 text-sm text-at-light-green">每组次数 </label>
              <input
                required
                type="text"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.reps"/>
            </div>
            <!-- weight重量 -->
            <div class="flex flex-col flex-1">
              <label for="weight" class="mb-1 text-sm text-at-light-green">
                体重(Kg)
              </label>
              <input
                required
                type="text"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.weight"/>
            </div>
            <!-- img绑定deleteExercise(item.id)事件，然后传入参数，class中设置绝对定位和样式 -->
            <img
              @click="deleteExercise(item.id)"
              src="@/assets/images/trash-light-green.png"
              class="h-4 w-auto absolute -left-5 cursor-pointer"
              alt="删除训练"/>
          </div>
          <!-- 添加Exercise按钮，和login.vue中的button类似，直接复制过来进行修改即可 ，这个button不能放在信息条div中，要放在外边，然后处于信息条的下方-->
          <button
            @click="addExercise"
            type="button"
            class="mt-6 py-2 px-6 rounded-sm self-start text-sm
          text-white bg-at-light-green duration-200 border-solid
            border-2 border-transparent hover:border-at-light-green hover:bg-white
          hover:text-at-light-green">
            添加锻炼
          </button>
        </div>

        <!-- Cardio Inputs -->
        <div v-if="workoutType === 'cardio'" class="flex flex-col gap-y-4">
          <div
            class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row"
            v-for="(item, index) in exercises"
            :key="index">
            <div class="flex flex-col md:w-1/3">
              <label for="cardio-type" class="mb-1 text-sm text-at-light-green">
                类型
              </label>
              <select
                id="cardio-type"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.cardioType">
                <!-- 第一个值设置为空  -->
                <option value="#">选择类型</option>
                <option value="run">跑步</option>
                <option value="walk">散步</option>
              </select>
            </div>
            <div class="flex flex-col flex-1">
              <label for="distance" class="mb-1 text-sm text-at-light-green">
                距离
              </label>
              <input
                required
                type="text"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.distance"/>
            </div>
            <div class="flex flex-col flex-1">
              <label for="duration" class="mb-1 text-sm text-at-light-green">
                时长
              </label>
              <input
                required
                type="text"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.duration"/>
            </div>
            <div class="flex flex-col flex-1">
              <label for="pace" class="mb-1 text-sm text-at-light-green">速度 </label>
              <input
                required
                type="text"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.pace"/>
            </div>
            <img
              @click="deleteExercise(item.id)"
              src="@/assets/images/trash-light-green.png"
              class="h-4 w-auto absolute -left-5 cursor-pointer"
              alt=""/>
          </div>
          <button
            @click="addExercise"
            type="button"
            class="mt-6 py-2 px-6 rounded-sm self-start text-sm
          text-white bg-at-light-green duration-200 border-solid
            border-2 border-transparent hover:border-at-light-green hover:bg-white
          hover:text-at-light-green">
            添加锻炼
          </button>
        </div>

        <button
          type="submit"
          class="mt-6 py-2 px-12 rounded-sm self-start text-sm text-white
        bg-at-light-green duration-200 border-solid border-2 border-transparent
        hover:border-at-light-green hover:bg-white hover:text-at-light-green">
          创建
        </button>
      </form>
    </div>
  </div>
</template>

<script>
// 导入ref包
import {ref} from "vue";
import {uid} from "uid";
// 导入supabase包
import {supabase} from "../supabase/init";

import {useRouter} from "vue-router";

export default {
  name: "create",
  setup() {
    // Create data
    const workoutName=ref('');
    const workoutType=ref('select-workout');
    const exercises=ref([]);
    const statueMsg=ref(null);
    const errorMsg=ref(null);

    const router=useRouter();

    // Add exercise
    const addExercise = ()=>{
      // 首先检查锻炼类型，我们要使用对象结构在上面定义的ref([])这传递给这个练习数组
      if(workoutType.value==='strength'){
        exercises.value.push({
          id:uid(),
          // 生成唯一的id，每个都有唯一的id，使用我们安装的uid，所以需要在上面导入uid
          exercise:"",
          sets:"",
          reps:"",
          weight:"",
        });
        return
        // 如果是strength，则返回，不再执行后面的代码
      }
      exercises.value.push({
        id:uid(),
        cardioType:"",
        distance:"",
        duration:"",
        pace:"",
      });
    }

    // Delete exercise 删除特定的锻炼项目需要获取特定唯一的id，所以要传递参数id
    const deleteExercise =(id)=>{
      // 确保有一项锻炼项目，所以当大于两个项目，这时可以进行删除
      if(exercises.value.length>1){
        //这里使用filter过滤器方法，运行过滤器 需要回调函数 过滤掉id不同的，找到确定id来进行删除
        exercises.value=exercises.value.filter(exercise=>exercise.id !== id);
        return;
      }
      // 如果锻炼项目个数小于等于1，则需要在errorMsg处输出错误
      errorMsg.value="Error:Cannot remove, need to at least have one exercise";
      // 然后设置定时器，一段时间后错误信息消失
      setTimeout(()=>{
        errorMsg.value=false;
      },5000)
    };

    // Listens for changing of workout type input监听运动类型的改变
    const workoutChange=()=>{
      // 重新初始化我们的练习数组变为空数组
      exercises.value=[];
      // 最后一件事是将正确练习添加到我们选择的练习数组中
      addExercise();
    }

    // Create workout
    const createWorkout=async()=>{
      try{
        // 传递参数为错误信息
        const {error}= await supabase.from('workouts').insert([
            {
              workoutName:workoutName.value,
              workoutType:workoutType.value,
              exercises:exercises.value,
            }
        ]);
        // 有错误抛出
        if(error)throw error;
        // 如果没有错误，提醒用户创建成功
        statueMsg.value='Success:Workout Created!';
        // 并且将这些值设置为0或初始值
        router.push({name:'Home'});
        workoutName.value=null;
        workoutType.value="select-workout";
        exercises.value=[];
        setTimeout(()=>{
          statueMsg.value=false;
        },5000)
      }
      // 抛出错误捕获来输出错误信息
      catch(error){
        // 记得使用斜单引号
        errorMsg.value=`Error:${error.message}`;
        setTimeout(()=>{
          errorMsg.value=false;
        },5000)
      }
    }

    return {
      workoutName,
      workoutType,
      exercises,
      statueMsg,
      errorMsg,
      addExercise,
      workoutChange,
      deleteExercise,
      createWorkout};
  },
};
</script>
