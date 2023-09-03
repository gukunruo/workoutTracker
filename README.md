# workout_tracker
assets：资源文件
components：组件，放导航栏vue
    Navigation.vue：里面定义了vue样板，script中定义setup设置选项 
router：路由
    index.js：创建回家Home的路线
store：Vuex专用目录，管理全局变量，便于组件之间传值，存储数据并且管理数据
    index.js：
supabase：使用其数据库和身份验证
views：各种vue文件
App.vue：有导入的谷歌字体

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
