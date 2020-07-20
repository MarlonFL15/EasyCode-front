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
import Drawer from './components/Elements/Drawer'
import Home from './components/Routes/Home'
import BlocklyQuestion from './components/Questions/Blockly'
import Blockly from './components/Routes/Blockly'
import Question from './components/Questions/Question-Card'
import Dashboard from './components/Routes/Dashboard'
import Form from './components/Questions/Form'
import Table from './components/Routes/Table/Container'
import Roullete from './components/Routes/Roulette/index'
export default function App() {
  return (
    <Router>
      <Switch>
        <Drawer>
          <PrivateRoute path="/dashboard" exact>
            <Dashboard/>
          </PrivateRoute>
          <PrivateRoute path="/blocos" exact>
            <Blockly/>
          </PrivateRoute>
          <PrivateRoute path="/questoes" exact>
            <Table/>
          </PrivateRoute>
          <PrivateRoute path="/roleta" exact>
            <Roullete/>
          </PrivateRoute>
          <Route path="/questao/:id" component={BlocklyQuestion}>
            
          </Route>
          <PrivateRoute path="/form" exact>
            <Form/>
          </PrivateRoute>
        </Drawer>
      
        <Route path="/" exact>
          <Home/>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/cadastro">
          <Add />
        </Route>
        
      </Switch>
    </Router>
  );
}

