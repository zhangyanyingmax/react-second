import React,{ Component } from 'react';
//表单使用antd
import { Form, Input, Button, Icon} from 'antd';

import logo from './logo.png';
import './index.less';

const Item = Form.Item;

export default class Login extends Component{
  render(){
    return <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo"/>
        <h1>React项目: 后台管理系统</h1>
      </header>
      <section className="login-from">
        <h2>用户登录</h2>
        <Form>
          <Item>
            <Input prefix={<Icon type="user" />} placeholder="用户名"/>
          </Item>
          <Item>
            <Input prefix={<Icon type="lock" />} type="password" placeholder="密码"/>
          </Item>
          <Item>
            <Button type="primary" className="login-btn">登录</Button>
          </Item>
        </Form>

      </section>
    </div>
  }
}