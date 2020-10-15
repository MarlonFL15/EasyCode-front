
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
import BlocklyQuestion from './components/Questions/index'
import Blockly from './components/Blocos/Blockly'
import Arduino from './components/Arduino/index.js'
import Question from './components/Questions/Question-Card'
import Dashboard from './components/Dashboard/Dashboard'
import TableVerdade from './components/Tabela-Questoes-Verdade/Container'
import TableVerdadeQuestion from './components/Tabela-verdade/index'
import Table from './components/Tabela-Questoes/Container'

import Roullete from './components/Roleta/Roleta.js'
import Quiz from './components/Quiz/Categories.js'
import Questions from "./components/Quiz/Question.js";
import Conquista from './components/Conquista'

export default function App() {
  return (
    <>
      
      <Router>
      <Conquista></Conquista>
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
          <PrivateRoute path="/roleta2" exact>
              <Roullete />
          </PrivateRoute>
          <PrivateRoute path="/questao">
              <BlocklyQuestion/>
          </PrivateRoute>
          <PrivateRoute path="/quiz" exact>
              <Quiz/>
          </PrivateRoute>
          <PrivateRoute path="/tabelas-verdade" exact>
              <TableVerdade/>
          </PrivateRoute>
          <PrivateRoute path="/tabela-verdade" exact>
              <TableVerdadeQuestion/>
          </PrivateRoute>
          <PrivateRoute path="/quiz/responder" exact>
              <Questions/>
          </PrivateRoute>
          <Route path="/" exact>
            <Home/>
          </Route>
          <PrivateRoute path="/arduino" exact>
            <Arduino/>
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/cadastro">
            <Add />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

