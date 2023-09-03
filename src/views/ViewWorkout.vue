<template>
<!-- 设置容器大小 外边距居中和内边距 -->
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- App Msg显示状态信息或错误信息 -->
    <div
      v-if="statusMsg || errorMsg"
      class="mb-10 p-4 rounded-md shadow-md bg-light-grey">
      <!-- 显示信息时用行内标签，没有信息时不占位置 -->
      <p class="text-at-light-green">
        {{ statusMsg }}
      </p>
      <p class="text-red-500">
        {{ errorMsg }}
      </p>
    </div>

<!-- 数据加载成功显示内容 -->
    <div v-if="dataLoaded">
      <!-- General Workout Info一般运动信息 -->
      <div
        class="flex flex-col items-center p-8 rounded-md shadow-md 
      bg-light-grey relative">
      <!-- 定义编辑按钮和删除按钮、用两个图片绑定点击事件，然后cursor换成pointer -->
        <div v-if="user" class="flex absolute left-2 top-2 gap-x-2">
          <!-- 编辑按钮：方法editMode -->
          <div
            class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer
          bg-at-light-green shadow-lg"
            @click="editMode">
            <img class="h-3.5 w-auto" src="@/assets/images/pencil-light.png" alt="" />
          </div>
      <!-- 删除按钮：方法deleteWorkout -->
          <div
            @click="deleteWorkout"
            class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer
          bg-at-light-green shadow-lg">
            <img class="h-3.5 w-auto" src="@/assets/images/trash-light.png" alt="" />
          </div>
        </div>

        <!-- 显示力量运动或者有氧运动的图标 -->
        <img
          v-if="data.workoutType === 'cardio'"
          class="h-24 w-auto"
          src="@/assets/images/running-light-green.png"
          alt=""/>

        <img
          v-else
          class="h-24 w-auto"
          src="@/assets/images/dumbbell-light-green.png"
          alt=""/>

        <!-- 显示运动类型和运动名称 -->
        <span
          class="mt-6 py-1.5 px-5 text-xs text-white bg-at-light-green
          rounded-lg shadow-md">
          {{ data.workoutType }}
        </span>
        <!-- v-if="edit"决定编辑模式，如果为真，则打开编辑模式input输入框，反之显示h1运动名称 -->
        <div class="w-full mt-6">
          <input
            v-if="edit"
            type="text"
            class="p-2 w-full text-gray-500 focus:outline-none"
            v-model="data.workoutName"/>
          <h1 v-else class="text-at-light-green text-2xl text-center">
            {{ data.workoutName }}
          </h1>
        </div>
      </div>

      <!-- Exercises运动信息模块  -->
      <div
        class="mt-10 p-8 rounded-md flex flex-col item-center
      bg-light-grey shadow-md">
        <!-- Strength Training力量训练模块  v-for循环来遍历运动数据  :key值为索引 -->
        <div v-if="data.workoutType === 'strength'" class="flex flex-col gap-y-4 w-full">
          <div
            class="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row"
            v-for="(item, index) in data.exercises"
            :key="index">
            <!-- 每个信息显示的label下面显示我们的信息，信息外边包裹input框来控制编辑 -->
            <div class="flex flex-2 flex-col md:w-1/3">
              <label for="exercise-name" class="mb-1 text-sm text-at-light-green">
                锻炼名称
              </label>
              <input
                id="exercise-name"
                v-if="edit"
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                v-model="item.exercise"/>
                <p v-else>{{ item.exercise }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="sets" class="mb-1 text-sm text-at-light-green">
                组
              </label>
              <input
                v-if="edit"
                id="sets"
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                v-model="item.sets"/>
                <p v-else>{{ item.sets }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="reps" class="mb-1 text-sm text-at-light-green">
                每组次数
              </label>
              <input
                v-if="edit"
                id="reps"
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                v-model="item.reps"/>
                <p v-else>{{ item.reps }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="weight" class="mb-1 text-sm text-at-light-green">
                体重(Kg)
              </label>
              <input
                v-if="edit"
                id="weight"
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                v-model="item.weight"/>
                <p v-else>{{ item.weight }}</p>
            </div>
            <!-- 删除按钮 -->
            <img
              v-if="edit"
              @click="deleteExercise(item.id)"
              class="absolute h-4 w-auto -left-5 cursor-pointer"
              src="@/assets/images/trash-light-green.png"
              alt=""/>
          </div>
          <button
            v-if="edit"
            @click="addExercise"
            type="button"
            class="py-2 px-6 rounded-sm self-start text-sm text-white
            bg-at-light-green duration-200 border-solid border-2 border-transparent
            hover:border-at-light-green hover:bg-white hover:text-at-light-green">
            添加锻炼
          </button>
        </div>

        <!-- Cardio有氧运动模块 -->
        <div v-else class="flex flex-col gap-y-4 w-full">
          <div
            class="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row"
            v-for="(item, index) in data.exercises"
            :key="index">
            <div class="flex flex-2 flex-col md:w-1/3">
              <label for="cardioType" class="mb-1 text-sm text-at-light-green">
                类型
              </label>
              <select
                id="cardioType"
                v-if="edit"
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                v-model="item.cardioType">
                <option value="#">选择类型</option>
                <option value="run">跑步</option>
                <option value="walk">散步</option>
              </select>
              <p v-else>{{ item.cardioType }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="distance" class="mb-1 text-sm text-at-light-green">
                距离
              </label>
              <input
                v-if="edit"
                id="distance"
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                v-model="item.distance"/>
                <p v-else>{{ item.distance }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="duration" class="mb-1 text-sm text-at-light-green">
                时长
              </label>
              <input
                v-if="edit"
                id="duration"
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                v-model="item.duration"/>
                <p v-else>{{ item.duration }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="pace" class="mb-1 text-sm text-at-light-green">
                速度
              </label>
              <input
                v-if="edit"
                id="pace"
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                v-model="item.pace"/>
                <p v-else>{{ item.pace }}</p>
            </div>
            <img
              @click="deleteExercise(item.id)"
              v-if="edit"
              class="absolute h-4 w-auto -left-5 cursor-pointer"
              src="@/assets/images/trash-light-green.png"
              alt=""/>
          </div>
          <!-- 编辑情况下可以添加运动信息 -->
          <button
            @click="addExercise"
            v-if="edit"
            type="button"
            class="py-2 px-6 rounded-sm self-start text-sm text-white
            bg-at-light-green duration-200 border-solid border-2 border-transparent
            hover:border-at-light-green hover:bg-white hover:text-at-light-green">
            添加锻炼
          </button>
        </div>
      </div>

      <!-- Update编辑情况下可以更新数据 -->
      <button
        v-if="edit"
        @click="update"
        type="button"
        class="mt-10 py-2 px-6 rounded-sm self-start text-sm text-white
            bg-at-light-green duration-200 border-solid border-2 border-transparent
            hover:border-at-light-green hover:bg-white hover:text-at-light-green">
        保存
      </button>
    </div>
  </div>
</template>

<script>
import {ref,computed} from 'vue';
import {supabase} from '../supabase/init';
import {useRoute,useRouter} from 'vue-router';
// 首先需要导入store包和computed（vue中）属性
import store from '../store/index';
// 需要用到uid来增加训练exercise
import {uid} from "uid";

export default {
  // name名字小写
  name: "view-workout",
  setup() {
    // Create data / vars
    const data=ref(null);
    const dataLoaded=ref(null);
    // 进行错误处理需要创建错误信息变量
    const errorMsg=ref(null);
    const statusMsg=ref(null);
    // 创建路由引用
    const route=useRoute();
    const router=useRouter();

    // 创建新的数据值来调用此用户 令这个值等于store.state.user
    const user=computed(()=>store.state.user);


    // Get current Id of route
    // currentId来自route通过params传值传来的workoutId（来自router/index.js）
    const currentId=route.params.workoutId;

    // 然后通过supabase根据我们的currentId，类似于Home.vue中通过API请求数据，只需将Home.vue中复制使用即可
    // Get workout data 不同的是需要在.select('*')后面添加.eq('id', currentId)并且改变catch中的内容
    const getData=async()=>{
      try{
        const {data: workouts,error}= await supabase.from('workouts').select('*').eq('id', currentId);
        if(error)throw error;
        data.value=workouts[0];
        dataLoaded.value=true;
        console.log(data.value); 
      }
      catch(error){
        errorMsg.value=error.message;
        setTimeout(()=>{
          errorMsg.value=false;
        },5000)
      }
    }

    // 然后进行调用 
    getData();

    // Delete workout
    const deleteWorkout=async()=>{
      try{
        // 我们需要链接到supabase删除指定id的信息，所以需要用到currentId
        const{error}= await supabase
          .from('workouts')
          .delete()
          .eq('id', currentId);
        if(error) throw error;
        router.push({name:'Home'});
      }
      catch(error){
        // 有错误会进行捕捉
        errorMsg.value=`Error: ${error.message}`;
        setTimeout(()=>{
          errorMsg.value=false;
          // 定时清除错误信息
        },5000);
      }
    }

    // Edit mode
    const edit =ref(null);
    // 需要创建一个功能将true切换为false去启动和关闭编辑模式
    const editMode=()=>{
      edit.value=!edit.value;
    }

    // Add exercise
    const addExercise = ()=>{
      // 首先检查锻炼类型，我们要使用对象结构在上面定义的ref([])这传递给这个练习数组
      if(data.value.workoutType==='strength'){
        data.value.exercises.push({
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
      data.value.exercises.push({
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
      if(data.value.exercises.length>1){
        //这里使用filter过滤器方法，运行过滤器 需要回调函数 过滤掉id不同的，找到确定id来进行删除
        data.value.exercises=data.value.exercises.filter(exercise=>exercise.id !== id);
        return;
      }
      // 如果锻炼项目个数小于等于1，则需要在errorMsg处输出错误
      errorMsg.value="Error:Cannot remove, need to at least have one exercise";
      // 然后设置定时器，一段时间后错误信息消失
      setTimeout(()=>{
        errorMsg.value=false;
      },5000)
    };

    // Update Workout
    const update=async()=>{
      try{
        const{error}=await supabase
        .from('workouts')
        .update({
          workoutName:data.value.workoutName,
          exercises:data.value.exercises
        }).eq('id', currentId);
        if(error)throw error;
        edit.value=false;
        statusMsg.value="Success:Workout Updated!";
        setTimeout(()=>{
          statusMsg.value=false;
          // 定时清除信息
        },5000);
      }
      catch(error){
        errorMsg.value=`Error: ${error.message}`;
        setTimeout(()=>{
          errorMsg.value=false;
          // 定时清除错误信息
        },5000);
      }
    }

    return {
      statusMsg,
      data,
      dataLoaded,
      errorMsg,
      edit,
      editMode,
      user,
      deleteWorkout,
      addExercise,
      deleteExercise,
      update};
  },
};
</script>
