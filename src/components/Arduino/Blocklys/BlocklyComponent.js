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
 * @fileoverview Blockly React Component.
 * @author samelh@google.com (Sam El-Husseini)
 */

import React from 'react';
import './BlocklyComponent.css';

import Blockly from 'blockly/core';
import locale from 'blockly/msg/pt-br';
import 'blockly/blocks';
import { TypedVariableModal } from '@blockly/plugin-typed-variable-modal';

//import XML from '../Blocklys/ToolBox'
Blockly.setLocale(locale);

class BlocklyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.blocklyDiv = React.createRef();
        this.toolbox = React.createRef();
    }
    onFirstComment = (event) =>{
        
        if(event.type == Blockly.Events.MOVE){
            this.changeCode()
        }
    
      }
      
    changeCode = () => {
        this.props.changeCode()
    }

    componentDidMount() {
        
        const { initialXml, children, ...rest } = this.props;
        //text_prompt_ext
        const XML = ""
        this.primaryWorkspace = Blockly.inject(
            this.blocklyDiv.current,
            {
                toolbox: XML,
                ...rest
            },
        );
        const test = function(e){
                alert("opa")
        }
        const typedVarModal = new TypedVariableModal(this.primaryWorkspace, test, [["int", ""], ["char", "char"], ["float", "float"]]);
        typedVarModal.init();
        const createFlyout = function(workspace) {
            
            let xmlList = [];
            // Add your button and give it a callback name.
            const button = document.createElement('button');
            button.setAttribute('text', 'Criar variável');
            button.setAttribute('callbackKey', test);
         
            xmlList.push(button);
         
            // This gets all the variables that the user creates and adds them to the
            // flyout.
            const blockList = Blockly.VariablesDynamic.flyoutCategoryBlocks(workspace);
            xmlList = xmlList.concat(blockList);
            return xmlList;
        };


        this.primaryWorkspace.registerToolboxCategoryCallback('CREATE_TYPED_VARIABLE', createFlyout);
        this.primaryWorkspace.addChangeListener(this.onFirstComment);
        //console.log(this.primaryWorkspace)
        if (initialXml) {
            Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initialXml), this.primaryWorkspace);
        }
    }

    get workspace() {
        return this.primaryWorkspace;
    }

    setXml(xml) {
        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), this.primaryWorkspace);
    }

    render() {
        const { children } = this.props;
        Blockly.HSV_SATURATION=0.8;
   
        return <div>
            <div ref={this.blocklyDiv} id="blocklyDiv" />
            <xml xmlns="https://developers.google.com/blockly/xml" is="blockly" style={{ display: 'none' }} ref={this.toolbox}>
                {children}
            </xml>
        </div>;
    }
}

export default BlocklyComponent;
