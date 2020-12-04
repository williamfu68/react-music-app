import React, { Component } from 'react';
// eslint-disable-next-line
import { Layout, Menu} from 'antd';
import { PlayCircleFilled,ContainerFilled } from '@ant-design/icons';
// eslint-disable-next-line
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import Player from './pages/player';
import List from './pages/list';
import './App.css';
// eslint-disable-next-line
const {Content,Sider} = Layout;

class App extends Component<any> {
  handleClick = ({key}:any)=>{
    
    const history = this.props.history;
    if(key === '1') {
      history.push('/player'); //使用 history参数中的 push()方法实现路由跳转
    } else if(key === '2') {
      history.push('/list')
    }
  }
  render() {
    return (
      <div className = "container">
        
        <Layout>
    
    <Layout>
      <Sider width={200} className="site-layout-background" trigger = {null} collapsible>
        <Menu
          
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
          onClick = {this.handleClick}
          theme="light"
        >
            <Menu.Item key="1" icon = {<PlayCircleFilled/>}>音乐播放器</Menu.Item>
            <Menu.Item key="2" icon = {<ContainerFilled/>}>播放列表</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        
        <Content
          className="site-layout-background"
          style={{
            height:'100vh'
          }}
        >
          <Switch>
            <Route path = "/player" component = {Player}/>
            <Route path = "/list" component = {List}/>
            <Redirect to = "/player"/>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  </Layout>
        
      </div>
    );
  }
}

export default withRouter(App);
