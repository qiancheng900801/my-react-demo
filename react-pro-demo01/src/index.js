import './index.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import App from './App';
import { mainRoutes } from './router'
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux'
import zhCN from 'antd/lib/locale/zh_CN';
import store from './store'
import 'antd/dist/antd.css'
ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/admin' render={routeProps =>
            <App {...routeProps}></App>
          }></Route>
          {mainRoutes.map((route, index) => (
            <Route key={index} path={route.path} component={route.component}></Route>
          ))}
          <Redirect to='/admin' from='/' />
          <Redirect to='/404'></Redirect>
        </Switch>
      </Router>
    </Provider>
  </ConfigProvider>,
  document.getElementById('root')
);