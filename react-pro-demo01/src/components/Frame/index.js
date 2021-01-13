import React, { useEffect, useState } from 'react';
import logo from './logo.svg'
import { Layout, Menu, Dropdown, Button, Avatar, message, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom'
import { adminRoutes } from '../../router'
import { removeToken } from '../../pages/utils/auth'
import { connect } from 'react-redux'
import './frame.css'
const routes = adminRoutes.filter(route => route.isShow)
const { Header, Content, Sider } = Layout;

function menu(props) {
  function menuClick(value) {
    console.log(value);
    switch (value.key) {
      case 'noti':
        props.history.push('/admin/notices')
        break;
      case 'setting':
        message.info('setting')
        break;
      case 'logout':
        removeToken()
        props.history.push('/login')
        break;

      default:
        break;
    }
  }
  return (
    <Menu onClick={menuClick}>
      <Menu.Item key='noti'>通知中心</Menu.Item>
      <Menu.Item key='setting'>设置</Menu.Item>
      <Menu.Item key='logout'>退出</Menu.Item>
    </Menu>
  )
}

function Index(props) {
  return (
    <Layout>
      <Header className="header">
        <div className="logo">
          <img style={{ width: '60px', height: '60px' }} src={logo} alt='logo'></img>
          <div>
            <Avatar size="large" icon={<UserOutlined />} />
            <Dropdown overlay={() => menu(props)} placement="bottomCenter">
              <Badge dot={!props.isAllRead}>
                <Button type='link'>超级管理员</Button>
              </Badge>
            </Dropdown>
          </div>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={[]}
            defaultOpenKeys={[]}
            style={{ height: '100%', borderRight: 0 }}
          >
            {routes.map(route => (
              <Menu.Item key={route.path} icon={route.icon} onClick={(e) => { props.history.push(e.key) }}>
                {route.title}</Menu.Item>
            ))}

            {/* <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu> */}
          </Menu>
        </Sider>
        <Layout style={{ padding: '16px' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: '#fff'
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
export default connect((state) => state.notices)(withRouter(Index))