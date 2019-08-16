import React,{ Component } from 'react';
import { withRouter} from 'react-router-dom';
import {Button, message} from 'antd';
import dayjs from 'dayjs';
import { reqWeather } from '../../api';
import { menuList } from '../../config';
import data from '../../utils/store';
import './index.less';

class HeaderMain extends Component{

  constructor(){
    super();
    this.state = {
      time: this.getTime(),
      weather: '晴',
      dayPictureUrl: 'http://api.map.baidu.com/images/weather/day/qing.png',
      title: ''
    }
  }

  //请求时间
  getTime = () => dayjs(Date.now()).format('YYYY-MM-DD  HH:mm:ss');

  componentDidMount(){
    this.timer = setInterval(() => {
      this.setState({
        time: this.getTime()
      })
    });
    //请求天气
    reqWeather('深圳')
      .then((res) => {
        this.setState(res);
        message.success('请求天气成功')
      })
      .catch((error) => {
        message.error(error)
      })
  }

  componentWillUnmount(){
    clearInterval(this.timer)
  }

  //获取组件title
  static getDerivedStateFromProps(nextProps,prevState){
    //获取路径
    const path = nextProps.location.pathname;
    if (path === '/'){
      return {
        title: '首页'
      }
    }
    //遍历menulist
    for (let i = 0; i <menuList.length ; i++) {
      const menu = menuList[i];
      if (menu.children){
        //二级菜单，继续遍历children
        for (let j = 0; j <menu.children.length ; j++) {
          const cMenu = menu.children[j];
          if (cMenu.key === path){
            return {
              title: cMenu.title
            }
          }
        }
      } else{
        if (menu.key === path){
          return {
            title: menu.title
          }
        }
      }
    }

  }



  render(){
    const { time, weather, dayPictureUrl, title} = this.state;
    return <div className="header-main">
      <div className="header-main-top">
        <span>欢迎，{data.user.username}</span>
        <Button type="link" >退出</Button>
      </div>
      <div className="header-main-bottom">
        <h3>{title}</h3>
        <div>
          <span>{time}</span>
          <img src={dayPictureUrl} alt=""/>
          <span>{weather}</span>
        </div>
      </div>
    </div>
  }
}

export default withRouter(HeaderMain);

