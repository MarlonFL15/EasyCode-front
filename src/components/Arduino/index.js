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
import colors from '../Colors';
import { Card } from '@material-ui/core';
class BlockDiv extends React.Component {
  constructor(props) {
    super(props);
    this.simpleWorkspace = React.createRef();

  }

  state = {
    question: {},
    code: '',
    iframeHeight: '750px'
  }

  componentDidMount = () => {

    axios.get('https://api.github.com/repos/ileathan/hubot-mubot/contents/src/mubot.coffee').then(e => {
      console.log(e)
      this.setState({ code: 'data:text/html;base64' + e.data.content })
    })

  }
  generateCode = () => {

    var code = Blockly.Arduino.workspaceToCode(
      this.simpleWorkspace.current.workspace
    );
    //console.log(this.simpleWorkspace.current.workspace)
    document.getElementById("code").value = code;

  }


  render() {
    // document.body.getElementById('content_blocks')[0].style
    window.addEventListener('resize', (e) => {
      if (document.getElementsByClassName('root')[0].clientWidth < 992 && this.state.iframeHeight === '750px')
        this.setState({ iframeHeight: '1200px' })
      if (document.getElementsByClassName('root')[0].clientWidth >= 992 && this.state.iframeHeight === '1200px')
        this.setState({ iframeHeight: '750px' })
    })
    return (

      <div className="root" style={{
        height: '100%',
        width: '100%',
        padding: 20,
        paddingTop: 100,
        display: 'absolute'
      }}>
        <div style={{ padding: 7, background: colors.blue, width: '100%', position: 'absolute', top: 0, height: 300, left: 0, zIndex: -1 }} />

        <Iframe url={"/blockly/ardublockly/blocklyArduino.html"}
          width="100%"
          height='100%'
          display="initial"
          padding='10px'
          border="0"
          frameBorder="0"
          position="relative"
          overflow='visible'
        />


      </div>

    );
  }
}

export default BlockDiv;
