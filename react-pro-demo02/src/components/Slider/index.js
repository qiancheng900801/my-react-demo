import React from 'react';
import { Menu, Button } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import menuList from '../../config/menuConfig'
const { SubMenu } = Menu

function SlideMenu(props) {
  let { pathname } = props.location


  let subMenu = menuList.find(item => {
    if (item.children) {
      return item.children.find(item2 => item2.key === pathname)
    }
  })
  let subMenuKey = subMenu ? subMenu.key : null


  function onSelect({ key }) {
    props.history.push(key)
  }

  function setMenu(menuList) {
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {setMenu(item.children)}
          </SubMenu>
        )
      }
    })
  }

  return (
    <Menu
      // defaultSelectedKeys={[pathname]}
      selectedKeys={[pathname]}
      defaultOpenKeys={[subMenuKey]}
      mode="inline"
      theme="dark"
      onSelect={onSelect}
    >
      {setMenu(menuList)}

    </Menu>
  )
}
export default withRouter(SlideMenu)