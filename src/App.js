import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PrivateRoute from './components/Routes/PrivateRoute'
import Login from './components/Login/SingUp'
import Add from './components/Cadastro/Add'
import Drawer from './components/Drawer/Drawer'
import Home from './components/Home/Home'
import BlocklyQuestion from './components/Questions/Blockly'
import Blockly from './components/Blocos/Blockly'
import Question from './components/Questions/Question-Card'
import Dashboard from './components/Dashboard/Dashboard'
import Form from './components/Questions/Form'
import Table from './components/Tabela-Questoes/Container'
import Roullete from './components/Roleta/index'
export default function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/dashboard" exact>
          <Drawer>
            <Dashboard/>
          </Drawer>
        </PrivateRoute>
        <PrivateRoute path="/blocos" exact>
          <Drawer>
            <Blockly/>
          </Drawer>
        </PrivateRoute>
        <PrivateRoute path="/questoes" exact>
          <Drawer>
            <Table/>
          </Drawer>
        </PrivateRoute>
        <PrivateRoute path="/roleta" exact>
          <Drawer>
            <Roullete/>
          </Drawer>
        </PrivateRoute>
        
        <Route path="/questao/">
          <Drawer>
            <BlocklyQuestion/>
          </Drawer>
        </Route>
        <PrivateRoute path="/form" exact>
          <Drawer>
            <Form/>
          </Drawer>
        </PrivateRoute>
      
    
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

