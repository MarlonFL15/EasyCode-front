import BlocklyJS from 'blockly/javascript';
import BlocklyPython from 'blockly/python';
import BlocklyPHP from 'blockly/php';
import BlocklyDart from 'blockly/dart';
import BlocklyLua from 'blockly/lua'
import {BlocklyC} from './generatorC'

const languages = {
    'Javascript':BlocklyJS,
    'Python': BlocklyPython,
    'PHP': BlocklyPHP,
    'Dart': BlocklyDart,
    'Lua': BlocklyLua,
    'C': BlocklyC
}

export default languages