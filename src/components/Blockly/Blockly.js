import React from 'react';
import ReactDOM from 'react-dom';
import Blockly from 'blockly';

import ReactBlocklyComponent from './index';
import ConfigFiles from './initContent/content';
import parseWorkspaceXml from './BlocklyHelper';

class TestEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = () => {
    window.setTimeout(() => {
      this.setState({
        toolboxCategories: [
          {
            name: 'Text2',
            blocks: [
              { type: 'text' },
              {
                type: 'text_print',
                values: {
                  TEXT: {
                    type: 'text',
                    shadow: true,
                    fields: {
                      TEXT: 'abc',
                    },
                  },
                },
              },
            ],
          },
        ],
      });
    }, 2000);
  }

  workspaceDidChange = (workspace) => {
    workspace.registerButtonCallback('myFirstButtonPressed', () => {
      alert('button is pressed');
    });
    const newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
    document.getElementById('generated-xml').innerText = newXml;

    const code = Blockly.JavaScript.workspaceToCode(workspace);
    document.getElementById('code').value = code;
  }

  render = () => (
    <ReactBlocklyComponent.BlocklyEditor
      toolboxCategories={this.state.toolboxCategories}
      workspaceConfiguration={{
        grid: {
          spacing: 20,
          length: 3,
          colour: '#ccc',
          snap: true,
        },
      }}
      initialXml={ConfigFiles.INITIAL_XML}
      wrapperDivClassName="fill-height"
      workspaceDidChange={this.workspaceDidChange}
    />
  )
}


window.addEventListener('load', () => {
  const editor = React.createElement(TestEditor);
  ReactDOM.render(editor, document.getElementById('blockly'));
});