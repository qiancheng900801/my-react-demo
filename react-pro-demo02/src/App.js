import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './components/Home'
function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login}></Route>
        <Route path='/' component={Home}></Route>
      </Switch>
    </Router>
  )
}

export default App;
