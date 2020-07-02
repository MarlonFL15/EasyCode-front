import React from 'react'
import Roullete from '../Roulette'
import ReactBlocklyComponent from 'react-blockly';
import Test from '../Blockly/dev-index'

const test = [
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
]
export default props =>{
    return(
        /*
        <Roullete items={['Se','Faça','Estruturas alinhadas','Enquanto', 'Repita', 'Escolha-caso']}/>
        */
       <Test/>
    )
}