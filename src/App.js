import React from "react";
import './index.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PrivateRoute from './components/Routes/PrivateRoute'
import Login from './components/Login/SingUp'
import Login2 from './components/Login'
import Add from './components/Cadastro/Add'
import Add2 from './components/Cadastro/'
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
        
        <Route path="/questao/">
            <BlocklyQuestion/>
        </Route>
        <PrivateRoute path="/form" exact>
            <Form/>
        </PrivateRoute>
      
    
        <Route path="/" exact>
          <Home/>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/login2">
          <Login2 />
        </Route>
        <Route path="/cadastro">
          <Add />
        </Route>
        <Route path="/cadastro2">
          <Add2 />
        </Route>
      </Switch>
    </Router>
  );
}

