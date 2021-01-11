import Login from '../pages/Login'
import Index from '../pages/admin/dashboard/Index'
import List from '../pages/admin/products/List'
import Edit from '../pages/admin/products/Edit'
import Welcome from '../pages/welcome'
import PageNotFound from '../pages/PageNotFound'
import Notices from '../pages/admin/notices/notices'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { FormProvider } from 'antd/lib/form/context'
export const mainRoutes = [
  { path: '/login', component: Login },
  { path: '/404', component: PageNotFound }
]

export const adminRoutes = [
  {
    path: '/admin/welcome',
    component: Welcome,
    isShow: false,
    title: '看板'
  },
  {
    path: '/admin/dashboard',
    component: Index,
    isShow: true,
    title: '看板',
    icon: <MailOutlined />
  },
  {
    path: '/admin/products',
    component: List,
    exact: true,
    isShow: true,
    title: '商品列表',
    icon: <AppstoreOutlined />
  },
  {
    path: '/admin/products/edit/:id?',
    component: Edit,
    isShow: false,
    title: ''
  },
  {
    path: '/admin/notices',
    component: Notices,
    isShow: false,
    title: ''
  }
]