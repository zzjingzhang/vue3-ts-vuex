import { createApp } from 'vue';
import { globalRegister } from './global/index';
import 'normalize.css';
import './assets/css/index.less';
import myRequest from './service/index';
// 全局引入组件库
// import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'; //引入样式
import App from './App.vue';
import router from './router';
import store from './store';
import { setupStore } from './store';

// import './service/axios_demo';

const app = createApp(App);
// 注册element-plus
// 写法一
// globalRegister(app);
// 写法二
app.use(globalRegister);
app.use(store);
app.use(router);
// app.use(ElementPlus);

// 防止用户刷新页面，store里面丢失登录信息
setupStore();
app.mount('#app');

// console.log(process.env);
// myRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('单独请求的config');
//       return config;
//     },
//     responseInterceptor: (res) => {
//       console.log('单独响应的res');
//       return res;
//     }
//   }
// });

// interface DataType {
//   data: any;
//   returnCode: string;
//   success: boolean;
// }
// myRequest
//   .request<DataType>({
//     url: '/home/multidata',
//     method: 'GET',
//     showLoading: false
//   })
//   .then((res) => {
//     // console.log(res, '0000');
//     // console.log(res.success);
//   });
