/**
 * @license
 *
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Main React component that includes the Blockly component.
 * @author samelh@google.com (Sam El-Husseini)
 */

import React from 'react';
import '../Blockly/Blocklys/BlocklyComponent.css'

import BlocklyComponent from '../Blockly/Blocklys/BlocklyComponent';

import Blockly from 'blockly/core';
import Languages from '../Blockly/generator/generators'

import Question from './Question-Card'
import Code from './Code'
import axios from '../../bd/client'
import Iframe from 'react-iframe'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { getToken } from '../auth'
import {
  BrowserRouter as Router,
  Switch,
  withRouter,
  Link
} from "react-router-dom";
import { Grid, makeStyles } from '@material-ui/core';
import colors from '../Colors';

class BlockDiv extends React.Component {
  constructor(props) {
    super(props);

    this.simpleWorkspace = React.createRef();
    this.lang = 'Python'
  }

  state = {
    question: {},
    correct: false,
    incorrect: false,
    xml: null,
    idUsuario: getToken()
  }
  componentDidMount = () => {

    const id = this.props.location.state.id

      axios.get("/getCodigoById/" + this.props.location.state.idResposta).then(response => {
        this.setState({ xml: response.data[0].codigo })
        console.log('terminou de rodar')

      }).catch(err => {

      })
    

    axios.get("/pergunta/" + id).then(response => {

      this.setState({ question: response.data, roleta: this.props.location.state.roleta })


   })
  }
  generateCode = () => {
    var code = Languages[this.lang].workspaceToCode(
      this.simpleWorkspace.current.workspace
    );
    document.getElementById("code").value = code;

  }

  changeLanguage = (event) => {
    this.lang = event.target.value

    this.generateCode()
  }



  onClick = (event) =>{
   
    window.addEventListener("message", this.messageReceived, false);
    document.getElementById("frame").contentWindow.postMessage({ "json_example": true }, "*");
  }
  messageReceived = (e) => {
    
    let code = e.data
    code = code.replaceAll('&lt;', '<')
    code = code.replaceAll('&gt;', '>')
    
    this.onSubmit(code)
    window.removeEventListener("message", this.messageReceived, false);
  

  }
  onSubmit = (code) => {

    axios.post('/submit', {
      idUsuario: this.state.idUsuario,
      code: code,
      idQuestao: this.state.question.id,
      roleta: this.state.roleta ? true : false,
      pontuacao: this.state.question.pontos,
      xml: '<oi>'
    }).then(response => {
      if (response.data.result) {
        this.setState({ incorrect: false, correct: true })

        if (response.data.conquista.length != 0) {
          var event = new CustomEvent('achievement', {
            'detail': {
              conquista: response.data.conquista
            }
          })
          window.dispatchEvent(event)
        }
      }
      else {
        this.setState({ incorrect: true, correct: false })
      }
    }).catch(error => {
      console.log(error)

    })
  }
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ incorrect: false, correct: false })
  };

  render() {

    console.log(this.state.xml)
    if (this.state.xml == null && this.props.location.state.idResposta)
      return false
    return (
      <Grid container style={{
        height: '100%',
        width: '100%',
        padding: 30,
        
        paddingTop: 100,

      }}>
      <div className="top" style={{ padding: 7, background: colors.blue, width: '100%', position: 'absolute', top: 0, left: 0, zIndex: -1 }} />

        <Grid item xs={12} md={7} style={{display:'flex',justifyContent:'flex-end', width:'auto'}}>
          <Iframe url={"/blockly/ardublockly/blocklyQuestion.html"}
            width="100%"
            height="600px"
            display="initial"
            border="0"
            frameBorder="0"
            id="frame"
            position="relative" />
        </Grid>
        <Grid item xs={12}md={5} style={{ width:'auto', padding: 5, paddingTop: 0}}>
          <Question submit={this.onClick} {...this.state.question}></Question>
          <textarea id="code" style={{ display: 'none' }}></textarea>
        </Grid>
        <Snackbar open={this.state.correct} autoHideDuration={6000} onClose={this.handleClose}>
          <MuiAlert elevation={6} variant="filled" onClose={this.handleClose} severity="success">
            Solução aceita!
          </MuiAlert>
        </Snackbar>
        <Snackbar open={this.state.incorrect} autoHideDuration={6000} onClose={this.handleClose}>
          <MuiAlert elevation={6} variant="filled" onClose={this.handleClose} severity="error">
            Solução Incorreta!
          </MuiAlert>
        </Snackbar>

      </Grid>
    );
  }
}

export default withRouter(BlockDiv);
