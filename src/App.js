import React,{ Component } from 'react';
/*
  1,在组件最外层包一个Router，那么组件内可以加载所有组件
  2,加载路由主要使用Route
  3,使用Switch，切换路由，只会匹配第一个，后面的不看,实现只显示一个组件内容
 */
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Login from './pages/login';
import Admin from './pages/admin';

import './App.css';


export default class App extends Component{
  render(){
    return <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Admin} />
      </Switch>
    </Router>
  }
}