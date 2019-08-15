/* 动态生成menu菜单，非路由组件没有history，location，match三大属性，
 * 使用withRouter高阶组件传入菜单组件即可以有三大属性 */

import React,{ Component } from 'react';
import {Icon, Menu} from "antd";
import { withRouter, Link} from 'react-router-dom';
import { menuList} from '../../config';

const { SubMenu, Item } = Menu;

class LeftNav extends Component{

  constructor(props){
    super(props);//要是用到props，所以要传入props
    this.selectKey = this.props.location.pathname;
    this.menu = this.createMenu(this.selectKey);
    console.log(this.menu);
  }

  createItem = (item) => {
    return <Item key={item.key}>
      <Link to={item.key}>
        <Icon type={item.icon} />
        <span>{item.title}</span>
      </Link>
    </Item>
  };

  createMenu = (path) => {
    //判断是一级菜单还是二级菜单
    return menuList.map((menu) => {
      if (menu.children){
        //二级菜单
        return <SubMenu key={menu.key} title={<span> <Icon type={menu.icon} /><span>{menu.title}</span></span>}>
          {
            menu.children.map((item) => {
              if (path === item.key){
                this.opneKey = menu.key;
              }
              return this.createItem(item)
            })
          }
        </SubMenu>
      }else{
        //一级菜单
        return this.createItem(menu)
      }
    })
  };

  render(){
    /*
    * defaultSelectedKeys:刷新后显示默认选中项
    * defaultOpenKeys:刷新后默认展开项
    * menu在render里生成，点击菜单时会一直重新渲染组件，为了减少渲染次数，将menu放到constructor中，只生成一次
    *
    * */

    return <Menu theme="dark" defaultSelectedKeys={[this.selectKey]} defaultOpenKeys={[this.opneKey]}  mode="inline">
      {
        this.menu
      }
    </Menu>
  }
}

export default withRouter(LeftNav);
