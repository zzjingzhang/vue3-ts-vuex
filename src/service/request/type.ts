import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface MYRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  // responseInterceptor?: (res: AxiosResponse) => AxiosResponse;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}

export interface MYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: MYRequestInterceptors<T>;
  showLoading?: boolean;
}
