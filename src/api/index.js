import axiosInstance from './ajax';

//定义登录的请求方法
export const reqLogin = (username,password) => axiosInstance.post('/login',{username,password});

//定义一个验证数据方法
export const reqValidateUser = (id) => axiosInstance.post('/validate/user',{id});