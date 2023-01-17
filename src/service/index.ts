// service 统一出口
import MYRequest from './request/index';
import { BASE_URL, TIME_OUT } from './request/config';
import localCache from '@/utils/cache';
const myRequest = new MYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // console.log('请求拦截');
      // 携带token的拦截
      const token = localCache.getCache('token');
      if (token && config.headers) {
        // config.headers.Authorization = `Bearer ${token}`; //这种方法需要将axios降低版本到1.1.3
        typeof config.headers.set === 'function' &&
          config.headers.set('Authorization', `Bearer ${token}`);
      }
      return config;
    },
    requestInterceptorCatch: (err) => {
      // console.log(err);
      return err;
    },
    responseInterceptor: (response) => {
      // console.log('响应拦截');
      return response;
    },
    responseInterceptorCatch: (err) => {
      return err;
    }
  }
});

export default myRequest;
