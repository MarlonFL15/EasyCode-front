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
import './Blocklys/BlocklyComponent.css'

import BlocklyComponent, { Block, Value, Field, Shadow } from './Blocklys';

import BlocklyJS from 'blockly/javascript';
import Languages from './generator/generators'
import './generator/generator';
import Question from '../Questions/Question-blockly'
import Code from '../Questions/Code'

class BlockDiv extends React.Component {
  constructor(props) {
    super(props);
    this.simpleWorkspace = React.createRef();
    this.lang = 'Javascript'
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
  render() {
    return (
      <div className="blockly-area">
        <div className="sidebar-blockly">
          <Question></Question>
          <Code changeLanguage = {this.changeLanguage}></Code>
        </div>
        
        <div className="blocklyDiv">
          <BlocklyComponent ref={this.simpleWorkspace}
            readOnly={false} trashcan={true} media={'media/'}
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
