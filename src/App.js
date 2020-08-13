import React from "react";
import './index.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PrivateRoute from './components/Routes/PrivateRoute'
import Login from './components/Login'
import Add from './components/Cadastro'
import Home from './components/Home/Home'
import BlocklyQuestion from './components/Questions/Blockly'
import Blockly from './components/Blocos/Blockly'
import Question from './components/Questions/Question-Card'
import Dashboard from './components/Dashboard/Dashboard'
import Form from './components/Questions/Form'
import Table from './components/Tabela-Questoes/Container'
import Roullete from './components/Roleta/index'
import Roullete2 from './components/Roleta/Roleta.js'
import Quiz from './components/Quiz'
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
            <Roullete2/>
        </PrivateRoute>
        <PrivateRoute path="/roleta2" exact>
            <Roullete />
        </PrivateRoute>
        <PrivateRoute path="/questao/">
            <BlocklyQuestion/>
        </PrivateRoute>
        <PrivateRoute path="/form" exact>
            <Form/>
        </PrivateRoute>
        <PrivateRoute path="/quiz" exact>
            <Quiz/>
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

