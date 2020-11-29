
import React from "react";
import './index.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Redirect,
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
import styled from "styled-components";
import Roullete from './components/Roleta/Roleta.js'
import Quiz from './components/Quiz/Categories.js'
import Questions from "./components/Quiz/Question.js";
import Conquista from './components/Conquista'
import { TransitionGroup, CSSTransition } from "react-transition-group";


export default function App() {
  return (
    <>
      <Router>
        <Conquista></Conquista>

        <Switch>
          <PrivateRoute path="/dashboard" exact>
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path="/blocos" exact>
            <Blockly />
          </PrivateRoute>
          <PrivateRoute path="/questoes" exact>
            <Table />
          </PrivateRoute>
          <PrivateRoute path="/roleta" exact>
            <Roullete />
          </PrivateRoute>
          <PrivateRoute path="/roleta2" exact>
            <Roullete />
          </PrivateRoute>
          <PrivateRoute path="/questao">
            <BlocklyQuestion />
          </PrivateRoute>
          <PrivateRoute path="/quiz" exact>
            <Quiz />
          </PrivateRoute>
          <PrivateRoute path="/tabelas-verdade" exact>
            <TableVerdade />
          </PrivateRoute>
          <PrivateRoute path="/tabela-verdade" exact>
            <TableVerdadeQuestion />
          </PrivateRoute>
          <PrivateRoute path="/quiz/responder" exact>
            <Questions />
          </PrivateRoute>
          <Route path="/" exact>
            <Home />
          </Route>
          <PrivateRoute path="/arduino" exact>
            <Arduino />
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


const Wrapper = styled.div`
  .fade-enter {
    opacity: 0.01;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 300ms ease-in;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit.fade-exit-active {
    opacity: 0.01;
    transition: opacity 300ms ease-in;
  }

  div.transition-group {
    position: relative;
  }

  section.route-section {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }
`;