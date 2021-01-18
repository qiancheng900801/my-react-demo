import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
const menuList = [
  {
    title: '首页',
    key: '/home',
    icon: <AppstoreOutlined />
  },
  {
    title: '商品管理',
    key: 'products',
    icon: <MenuUnfoldOutlined />,
    children: [
      {
        title: '商品列表',
        key: '/products/list',
        icon: <MenuFoldOutlined />
      },
      {
        title: '商品编辑',
        key: '/products/edit',
        icon: <PieChartOutlined />,
        children: [
          {
            title: '增加',
            key: '/products/add',
            icon: <PieChartOutlined />
          },
          {
            title: '删除',
            key: '/products/del',
            icon: <PieChartOutlined />
          }
        ]
      }
    ]
  }
]

export default menuList