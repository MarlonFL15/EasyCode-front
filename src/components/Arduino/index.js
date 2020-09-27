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
import axios from 'axios';
import Iframe from 'react-iframe'
import '../Blockly/Blocklys/BlocklyComponent.css'
import Blockly from 'blockly/core';
import BlocklyComponent, { Block, Value, Field, Shadow } from '../Arduino/Blocklys/BlocklyComponent';


import Code from '../Questions/Code'
class BlockDiv extends React.Component {
  constructor(props) {
    super(props);
    this.simpleWorkspace = React.createRef();
    
  }

  state = {
    question:{},
    code: ''
  }
  
  componentDidMount = () => {
      axios.get('https://api.github.com/repos/ileathan/hubot-mubot/contents/src/mubot.coffee').then(e => {
        console.log(e)
        this.setState({code: 'data:text/html;base64'+e.data.content})
      })
  }
  generateCode = () => {

    var code = Blockly.Arduino.workspaceToCode(
      this.simpleWorkspace.current.workspace
    );
    console.log(Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this.simpleWorkspace.current.workspace)))
    //console.log(this.simpleWorkspace.current.workspace)
    document.getElementById("code").value = code;
   
  }

  render() {
    return (
        <Iframe url={"https://marlonfl15.github.io/ardublockly/blocklyArduino.html"}
        width="100%"
        height="750px"
        display="initial"
        border="0"
        frameBorder="0"
        position="relative"/>  
      
    );
  }
}

export default BlockDiv;
