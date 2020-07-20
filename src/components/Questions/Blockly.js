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

import BlocklyComponent, { Block, Value, Field, Shadow } from '../Blockly/Blocklys';

import BlocklyJS from 'blockly/javascript';
import Languages from '../Blockly/generator/generators'
import '../Blockly/generator/generator';
import Question from './Question-Card'
import Code from './Code'
import axios  from '../../bd/client'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
class BlockDiv extends React.Component {
  constructor(props) {
    super(props);
    this.simpleWorkspace = React.createRef();
    this.lang = 'Python'
  }

  state = {
    question:{},
    correct: false,
    incorrect:false
  }
  componentDidMount = () =>{
    
     const  id  = this.props.match.params.id
     axios.get("/pergunta/"+id).then(response => {
      console.log('entrou aqui')
      this.setState({question:response.data})
      console.log(response.data)
  
    })
  }
  generateCode = () => {
    
    var code = Languages[this.lang].workspaceToCode(
      this.simpleWorkspace.current.workspace
    );
    document.getElementById("code").value = code;
   
  }

  changeLanguage = (event) =>{
    this.lang = event.target.value
    console.log('eae')
    this.generateCode()
  }

  onSubmit = (event) => {
    const code = Languages['Python'].workspaceToCode(
      this.simpleWorkspace.current.workspace
    );
    axios.post('/submit', {code:code, id:this.state.question.id}).then(response => {
      if(response.data.result){
        this.setState({incorrect:false, correct:true})
        
      }
      else{
        this.setState({incorrect:true, correct:false})
      }
    }).catch(error => {
      console.log(error)
      
    })
  }
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({incorrect:false, correct:false})
  };
  render() {
    console.log(this.state)
    return (
      <div className="blockly-area">
        <div className="sidebar-blockly">
          <Question submit={this.onSubmit} {...this.state.question}></Question>
          <textarea id="code" style={{display:'none'}}></textarea>
        </div>
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
        <div className="blocklyDiv">
          <BlocklyComponent ref={this.simpleWorkspace}
            readOnly={false} trashcan={true} media={'../media/'}
            changeCode = {this.generateCode}
            move={{
              scrollbars: false,
              drag: true,
              wheel: true
            }}
          >
          
          </BlocklyComponent>
        </div>
      </div>
    );
  }
}

export default BlockDiv;
