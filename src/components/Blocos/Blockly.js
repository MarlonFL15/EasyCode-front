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
import Blockly from 'blockly/core';
import Iframe from 'react-iframe'
import BlocklyComponent, { Block, Value, Field, Shadow } from '../Blockly/Blocklys';

import Languages from '../Blockly/generator/generators'

import Code from '../Questions/Code'
import colors from '../Colors';
class BlockDiv extends React.Component {
  constructor(props) {
    super(props);
    this.simpleWorkspace = React.createRef();
    this.lang = 'C'
  }

  state = {
    question: {}
  }

  generateCode = () => {

    var code = Languages[this.lang].workspaceToCode(
      this.simpleWorkspace.current.workspace
    );
    console.log(Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this.simpleWorkspace.current.workspace)))
    //console.log(this.simpleWorkspace.current.workspace)
    document.getElementById("code").value = code;

  }

  changeLanguage = (event) => {
    this.lang = event.target.value
    console.log('eae')
    console.log(Languages)
    alert(this.lang)
    this.generateCode()
  }
  render() {
    return (
      <div className="root" style={{
        height: '100%',
        width: '100%',
        padding: 20,
        paddingTop: 100,
        display: 'absolute'
      }}>
        <div style={{ padding: 7, background: colors.blue, width: '100%', position: 'absolute', top: 0, height: 300, left: 0, zIndex: -1 }} />
        <Iframe url={"/blockly/ardublockly/blocklyLanguages.html"}
          width="100%"
          height="750px"
          display="initial"
          border="0"
          frameBorder="0"
          position="relative" />
      </div>
      // <div className="blockly-area">
      //   <div className="sidebar-blockly">
      //     <Code style={{height:'100%'}} changeLanguage = {this.changeLanguage}></Code>
      //   </div>

      //   <div className="blocklyDiv">
      //     <BlocklyComponent ref={this.simpleWorkspace}
      //       readOnly={false} trashcan={true} media={'../media/'}
      //       changeCode = {this.generateCode}
      //       move={{
      //         scrollbars: false,
      //         drag: true,
      //         wheel: true
      //       }}
      //     >

      //     </BlocklyComponent>
      //   </div>
      // </div>
    );
  }
}

export default BlockDiv;
