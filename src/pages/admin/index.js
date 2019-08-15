import React,{ Component } from 'react';
import { Spin, message, Layout} from 'antd';
import { Link} from 'react-router-dom';
import { getItem} from '../../utils/storage';
import { reqValidateUser} from '../../api';
import data from '../../utils/store';
import logo from '../../assets/images/logo.png';
import './index.less';
import LeftNav from '../../components/left-nav';



const { Header, Content, Footer, Sider } = Layout;



export default class Admin extends Component{

  //定义初始化状态
  state = {
    isLoading: true,
    collapsed:false,
    isDisplay: 'block'
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({
      collapsed ,
      isDisplay: collapsed ? 'none':'block'
    })
  };

  checkUserLogin = () => {
    if (!data.user._id){
      // console.log(data.user_id);
      //内存中没有数据，去本地查找
      const user = getItem();
      // console.log(user);
      if (!user){
        //本地也没有数据,去登陆
        this.props.history.replace('/login');
        return true;
      }
      //本地有数据，验证数据是否合法，合法给登录，不合法去登录
      reqValidateUser(user._id)
        .then(() => {
          //数据验证成功了，先存到内存
          data.user = user;
          //更新状态
          this.setState({
            isLoading: false
          });
          // console.log(this.state.isLoading);

        })
        .catch((error) => {
          //验证失败，去登陆
          this.props.history.replace('/login');
          message.error('请先登录')
        });
      //请求是异步操作，数据还未请求回来就执行下一步了，所以需要先渲染loading
      return true;
    } else {
      // console.log(data.user_id);
      return false;
    }
  };


  render(){
    const isLoading = this.checkUserLogin();
    // console.log(isLoading);
    if (isLoading) return <Spin tip="loading...." />;

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <Link className="admin-logo" to="/home">
            <img src={logo} alt="logo"/>
            <h1 style={{display:this.state.isDisplay}}>硅谷后台</h1>
          </Link>
          {/*定义组件动态生成menu菜单*/}
          <LeftNav />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}