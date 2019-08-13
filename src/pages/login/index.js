import React,{ Component } from 'react';
//表单使用antd
import { Form, Input, Button, Icon, message} from 'antd';
import axios from 'axios';

import logo from './logo.png';
import './index.less';

const Item = Form.Item;

class Login extends Component{
  //自定义表单校验
  validator = (rule,value,callback) => {
    /*console.log(rule,value);
    callback();
    rule:可以判定是哪个input组件做的校验
    value：输入的值
    callback() 不传参表示校验成功
    callback(error) 传参表示校验失败提示的信息
    */
    const name = rule.field === 'username'? '用户名' : '密码';
    const valueReg = /^\w+$/;

    if (!value){
      callback(`请输入${name}`)
    }else if (value.length > 10){
      callback(`${name}长度要小于10`)
    } else if (value.length < 4){
      callback(`${name}长度要大于4`)
    }else if (!valueReg.test(value)){
      callback(`${name}只能是数字，字母，下划线`)
    }

    //校验成功
    callback();
  };

  login = (e) => {
    //需要禁止表单提交的默认事件
    e.preventDefault();
    //需要做校验
    this.props.form.validateFields((error,values) => {
      // console.log(error,values);
      /*
        error：校验错误的信息
        values：对象，username，password
       */
      if (!error){
        //无错误，校验成功，允许登录
        //发送ajax请求，使用axios
        axios.post('http://localhost:3001/login',values)
          .then((response) => {
            //请求成功，允许登录
            //response.data就是请求返回的数据状态
            const result = response.data;
            if (result.status === 0){
              //登录成功
              message.success('登录成功',1)
            } else{
              //登录失败，返回错误信息
              message.error(result.msg,1);
              //重置密码
              this.props.form.resetFields(['password'])
            }
          })
          .catch((error) => {
            //请求失败，返回错误信息
            message.error('登录失败，网络发生异常',2);
            //重置密码
            this.props.form.resetFields(['password'])
          })
      }

      //有错误，浏览器会自动校验提示
    })
  };

  render(){
    const { getFieldDecorator } = this.props.form;
    return <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo"/>
        <h1>React项目: 后台管理系统</h1>
      </header>
      <section className="login-from">
        <h2>用户登录</h2>
        <Form onSubmit={this.login}>
          <Item>
            {
              getFieldDecorator(
                'username',
                {
                  rules: [
                    {validator: this.validator}
                  ]
                }
              )(
                <Input prefix={<Icon type="user" />} placeholder="用户名"/>
              )
            }
          </Item>
          <Item>
            {
              getFieldDecorator(
                'password',
                {
                  rules: [
                    {validator: this.validator}
                  ]
                }
              )(
                <Input prefix={<Icon type="lock" />} type="password" placeholder="密码"/>
              )
            }
          </Item>
          <Item>
            <Button type="primary" className="login-btn" htmlType="submit">登录</Button>
          </Item>
        </Form>

      </section>
    </div>
  }
}

/*
  使用高阶组件获取一个方法用于表单校验，使表单具有form属性
 */

export default Form.create()(Login);