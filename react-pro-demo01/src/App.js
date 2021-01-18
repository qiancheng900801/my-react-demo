import './App.css'
import { Route, Switch, Redirect } from 'react-router-dom'
import { adminRoutes } from './router'
import Frame from './components/Frame'
import { isLogined } from './pages/utils/auth'
function App() {
  return (
    isLogined() ?
      <Frame>
        <Switch>
          {adminRoutes.map(route => (
            <Route key={route.path} path={route.path} exact={route.exact} render={routeProps => (
              <route.component {...routeProps} />
            )} />
          ))}
          <Redirect to='/admin/dashboard' from='/admin' />
          <Redirect to='/404' />
        </Switch>
      </Frame>
      : <Redirect to='/login' />



  );
}

export default App;
