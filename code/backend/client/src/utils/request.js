import axios from 'axios';
import { message } from 'antd';
import { baseUrl } from './config';

const whiteList = [/^\/login/]

const request = (options) => {
    return new Promise((resolve, reject) => {
        if (options === undefined || Object.keys(options).length === 0) {
          return Promise.reject({ code: 201, msg: '参数不能为空' })
        }
        if (options && options.url === undefined) {
          return Promise.reject({ code: 201, msg: '缺少请求参数url' })
        }
    
        // 创建实例
        const instance = axios.create({
          baseURL: '/api',
          url: `${options.url}`,
          headers: {
            'Content-Type': 'application/json',
          },
          validateStatus(status) {
            return status < 500;
          },
          timeout: 3000,
        })

        // 根据请求配置对应的参数类型
        if (options.type === undefined || options.type.toUpperCase() === 'GET') {
          options.params = options.data;
        }

        // 请求拦截
        instance.interceptors.request.use(config => {
          const { url } = config;
          const notNeedAuth = whiteList.some(reg => reg.test(url));
          if (!notNeedAuth) {
            config.headers.Authorization = `Bearer 123456`
          }
          return config;
        }, error => Promise.reject(error));

        // 响应拦截
        instance.interceptors.response.use(response => {
          const { status, data, statusText } = response;
          if (status === 200) {
            return { code: status, data, msg: statusText };
          }
          if (status === 401) {
            message.error('登录已过期');
            window.location.href = '/login';
          }
          
          // return { code: status, msg: statusText }
          // return { code: 200, msg: '成功' }
        }, error => {
          message.error("服务异常");
          return Promise.reject(error);
        });
        
        // 配置实例
        instance(options).then(resolve).catch(error => {
          message.error(error.message || '请求出错')
          reject(error);
        })
    })
}

export default request;