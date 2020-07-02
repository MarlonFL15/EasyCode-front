import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PrivateRoute from './components/Routes/PrivateRoute'
import Login from './components/Routes/SingUp'
import Add from './components/Routes/Add'
import Drawer from './components/Drawer'
import Home from './components/Routes/Home'
import Dashboard from './components/Routes/Dashboard'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/cadastro">
          <Add />
        </Route>
        <PrivateRoute path="/dashboard" exact>
          <Drawer><Dashboard/></Drawer>
        </PrivateRoute>
        <PrivateRoute path="/blockly" exact>
          <Drawer><Dashboard/></Drawer>
        </PrivateRoute>
        <PrivateRoute path="/roulette" exact>
          <Drawer><Dashboard/></Drawer>
        </PrivateRoute>

      </Switch>
    </Router>
  );
}

