// 为了处理数据，需要导入reactive
import {reactive} from "vue";

// 创建一个reactive对象，用它来调用状态
const state = reactive({
    user:null,
});

// 在App.vue中onAuthStateChange方法中使用store.methods.setUser(session)之后，需要在此创建这个方法
const methods={
    // 传入payload有效载荷 
    setUser(payload){
        // 发送一个会话，继续更新状态，来检查这个有效载荷，如果注销了会发送一个session
        state.user = payload?payload.user:null;
        // 通过三目运算符来确定状态，如果为真则为payload.user，为假则为null
    }
}

// 为了访问到这个状态，需要将它暴露出去
export default{
    state,
    methods,
}