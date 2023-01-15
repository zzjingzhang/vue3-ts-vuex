import axios from 'axios';
class MYRequest {
  constructor(config) {
    this.instance = axios.create(config); // 创建axios实例
    this.interceptors = config.interceptors;

    // 从config中取出的拦截器是对应的实例拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有的实例都有的拦截器:请求成功');
        return config;
      },
      (err) => {
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (response) => {
        console.log('所有的实例都有的拦截器:响应成功');
        return response;
      },
      (err) => {
        return err;
      }
    );
  }
  request(config) {
    this.instance.request(config).then((res) => {
      console.log(res);
    });
  }
  // get() {}
}

export default MYRequest;
