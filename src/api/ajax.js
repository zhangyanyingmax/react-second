import axios from 'axios';

/* 处理开发环境和生成环境路径问题，使用axios实例对象方法，提前定义一些基础路径*/

//使用process.env.NODE_ENV判断当前是开发还是生产环境
console.log(process.env.NODE_ENV);
const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'http://localhost:5000';


const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000
});

//使用拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    //请求成功，返回成功的数据
    const result = response.data;
    if (result.status === 0){
      return result.data || {};
    } else{
      return Promise.reject(result.msg || '请求失败');
    }

  },
  (error) => {
    return Promise.reject('网络异常，请刷新重试');
  }
);

export default axiosInstance;