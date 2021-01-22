import React from 'react';
import { Layout } from 'antd'
import LeftMenu from '../Slider'
import Welcome from '../../pages/home/home'
import ProductsList from '../../pages/product/list'
import ProductsEdit from '../../pages/product/edit'
import menuList from '../../config/menuConfig'
import './index.css'
import { Redirect, Route, Switch } from 'react-router-dom';
const { Sider, Header, Content, Footer } = Layout
function Home(props) {
  console.log(props);
  function getTitle() {
    let { pathname } = props.location
    let title = ''
    menuList.forEach(item => {
      if (item.key === pathname) {
        title = item.title
      }
    })

  }
  return (
    <Layout className='home'>
      <Sider style={{ width: '500px' }}>
        <LeftMenu></LeftMenu>
      </Sider>
      <Layout>
        <Header style={{ height: '80px', background: '#ccc' }}>
          当前标题：
        </Header>
        <Content>
          <Switch>
            <Route path='/home' component={Welcome}></Route>
            <Route path='/products/list' component={ProductsList}></Route>
            <Route path='/products/edit' component={ProductsEdit}></Route>
            <Redirect to='/home' from='/*'></Redirect>
          </Switch>
        </Content>
        <Footer style={{ height: '80px', background: '#ccc' }}>
          footer
        </Footer>
      </Layout>
    </Layout>
  )
}
export default Home