import axios from 'axios'; // 导入的是axios的实例对象

// 1.模拟get请求
axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
  // console.log(res);
});

// 2.get请求，并且传入参数
// axios
//   .get('http://httpbin.org/get', {
//     params: {
//       name: 'abc',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data);
//   });

// // 3.post请求

// axios
//   .post('http://httpbin.org/post', {
//     data: {
//       name: 'abc',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data, 'post');
//   });

// promise 本身是可以有类型的

new Promise<string>((resolve) => {
  resolve('123');
}).then((res) => {
  // console.log(res);
});

// 4.axios的配置选项
// 4.1  全局配置
axios.defaults.baseURL = 'http://httpbin.org'; // 基本路径
axios.defaults.timeout = 10000; // 超时时间
// axios.defaults.headers={}//公共请求头
axios
  .get('/get', {
    params: {
      name: 'abc',
      age: 18
    },
    timeout: 5000, // 局部配置
    headers: {}
  })
  .then((res) => {
    // console.log(res.data);
  });

// 3.post请求

axios
  .post('/post', {
    data: {
      name: 'abc',
      age: 18
    }
  })
  .then((res) => {
    // console.log(res.data, 'post');
  });

// 5   axios.all 多个请求，一起返回

axios
  .all([
    axios.get('/get', { params: { name: 'abc', age: 18 } }),
    axios.post('/post', { data: { name: 'abc', age: 18 } })
  ])
  .then((res) => {
    // console.log(res);
  });

// 6 axios 的拦截器
// fn1：请求发送成功会执行的函数
// fn2：请求发送失败会执行的函数
axios.interceptors.request.use(
  (config) => {
    // 想做的操作
    // 1.给请求添加token 2.isLoading动画
    // console.log('请求成功');
    return config;
  },
  (err) => {
    // console.log('请求发生错误');
    return err;
  }
);

// fn1：数据响应成功(服务器正常的返回了数据 20x)会执行的函数
// fn2：数据响应失败会执行的函数
axios.interceptors.response.use(
  (respon) => {
    // console.log(respon);
    // console.log('响应成功');
    return respon;
  },
  (err) => {
    // console.log('响应失败');
    // console.log(err);
    return err;
  }
);
