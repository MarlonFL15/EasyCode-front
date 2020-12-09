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
 * @fileoverview Define generation methods for custom blocks.
 * @author samelh@google.com (Sam El-Husseini)
 */

// More on generating code:
// https://developers.google.com/blockly/guides/create-custom-blocks/generating-code

import * as Blockly from 'blockly/core';

const BlocklyC = new Blockly.Generator('C')
BlocklyC.ORDER_ADDITION= 6.2
BlocklyC.ORDER_ASSIGNMENT= 16
BlocklyC.ORDER_ATOMIC= 0
BlocklyC.ORDER_AWAIT= 4.8
BlocklyC.ORDER_BITWISE_AND= 10
BlocklyC.ORDER_BITWISE_NOT= 4.1
BlocklyC.ORDER_BITWISE_OR= 12
BlocklyC.ORDER_BITWISE_SHIFT= 7
BlocklyC.ORDER_BITWISE_XOR= 11
BlocklyC.ORDER_COMMA= 18
BlocklyC.ORDER_CONDITIONAL= 15
BlocklyC.ORDER_DECREMENT= 3
BlocklyC.ORDER_DELETE= 4.7
BlocklyC.ORDER_DIVISION= 5.2
BlocklyC.ORDER_EQUALITY= 9
BlocklyC.ORDER_EXPONENTIATION= 5
BlocklyC.ORDER_FUNCTION_CALL= 2
BlocklyC.ORDER_IN= 8
BlocklyC.ORDER_INCREMENT= 3
BlocklyC.ORDER_INSTANCEOF= 8
BlocklyC.ORDER_LOGICAL_AND= 13
BlocklyC.ORDER_LOGICAL_NOT= 4.4
BlocklyC.ORDER_LOGICAL_OR= 14
BlocklyC.ORDER_MEMBER= 1.2
BlocklyC.ORDER_MODULUS= 5.3
BlocklyC.ORDER_MULTIPLICATION= 5.1
BlocklyC.ORDER_NEW= 1.1
BlocklyC.ORDER_NONE= 99
BlocklyC.ORDER_RELATIONAL= 8
BlocklyC.ORDER_SUBTRACTION= 6.1
BlocklyC.ORDER_TYPEOF= 4.5
BlocklyC.ORDER_UNARY_NEGATION= 4.3
BlocklyC.ORDER_UNARY_PLUS= 4.2
BlocklyC.ORDER_VOID= 4.6
BlocklyC.ORDER_YIELD= 17
BlocklyC.texts= {}
BlocklyC.variables= {}
BlocklyC.variablesDynamic= {}

/**
 * List of outer-inner pairings that do NOT require parentheses.
 * @type {!Array.<!Array.<number>>}
 */
BlocklyC.ORDER_OVERRIDES = [
    // (foo()).bar -> foo().bar
    // (foo())[0] -> foo()[0]
    [BlocklyC.ORDER_FUNCTION_CALL, BlocklyC.ORDER_MEMBER],
    // (foo())() -> foo()()
    [BlocklyC.ORDER_FUNCTION_CALL, BlocklyC.ORDER_FUNCTION_CALL],
    // (foo.bar).baz -> foo.bar.baz
    // (foo.bar)[0] -> foo.bar[0]
    // (foo[0]).bar -> foo[0].bar
    // (foo[0])[1] -> foo[0][1]
    [BlocklyC.ORDER_MEMBER, BlocklyC.ORDER_MEMBER],
    // (foo.bar)() -> foo.bar()
    // (foo[0])() -> foo[0]()
    [BlocklyC.ORDER_MEMBER, BlocklyC.ORDER_FUNCTION_CALL],
  
    // !(!foo) -> !!foo
    [BlocklyC.ORDER_LOGICAL_NOT, BlocklyC.ORDER_LOGICAL_NOT],
    // a * (b * c) -> a * b * c
    [BlocklyC.ORDER_MULTIPLICATION, BlocklyC.ORDER_MULTIPLICATION],
    // a + (b + c) -> a + b + c
    [BlocklyC.ORDER_ADDITION, BlocklyC.ORDER_ADDITION],
    // a && (b && c) -> a && b && c
    [BlocklyC.ORDER_LOGICAL_AND, BlocklyC.ORDER_LOGICAL_AND],
    // a || (b || c) -> a || b || c
    [BlocklyC.ORDER_LOGICAL_OR, BlocklyC.ORDER_LOGICAL_OR]
  ];
  
  /**
   * Initialise the database of variable names.
   * @param {!Blockly.Workspace} workspace Workspace to generate code from.
   */
  BlocklyC.init = function(workspace) {
    // Create a dictionary of definitions to be printed before the code.
    BlocklyC.definitions_ = Object.create(null);
    // Create a dictionary mapping desired function names in definitions_
    // to actual function names (to avoid collisions with user functions).
    BlocklyC.functionNames_ = Object.create(null);
  
    if (!BlocklyC.variableDB_) {
      BlocklyC.variableDB_ =
          new Blockly.Names(BlocklyC.RESERVED_WORDS_);
    } else {
      BlocklyC.variableDB_.reset();
    }
  
    BlocklyC.variableDB_.setVariableMap(workspace.getVariableMap());
  
    var defvars = [];
    // Add developer variables (not created or named by the user).
    var devVarList = Blockly.Variables.allDeveloperVariables(workspace);
    for (var i = 0; i < devVarList.length; i++) {
      defvars.push(BlocklyC.variableDB_.getName(devVarList[i],
          Blockly.Names.DEVELOPER_VARIABLE_TYPE));
    }
  
    // Add user variables, but only ones that are being used.
    var variables = Blockly.Variables.allUsedVarModels(workspace);
    
    for (var i = 0; i < variables.length; i++) {
      defvars.push(BlocklyC.variableDB_.getName(variables[i].getId(),
          Blockly.VARIABLE_CATEGORY_NAME));
    }
  
    // Declare all of the variables.
    
    if (defvars.length) {
      BlocklyC.definitions_['variables'] =
          'var ' + defvars.join(', ') + ';';
    }
  };
  
  /**
   * Prepend the generated code with the variable definitions.
   * @param {string} code Generated code.
   * @return {string} Completed code.
   */
  BlocklyC.finish = function(code) {
    // Convert the definitions dictionary into a list.
    var definitions = [];
    for (var name in BlocklyC.definitions_) {
      definitions.push(BlocklyC.definitions_[name]);
    }
    // Clean up temporary data.
    delete BlocklyC.definitions_;
    delete BlocklyC.functionNames_;
    BlocklyC.variableDB_.reset();
    return definitions.join('\n\n') + '\n\n\n' + code;
  };
  
  /**
   * Naked values are top-level blocks with outputs that aren't plugged into
   * anything.  A trailing semicolon is needed to make this legal.
   * @param {string} line Line of generated code.
   * @return {string} Legal line of code.
   */
  BlocklyC.scrubNakedValue = function(line) {
    return line + ';\n';
  };
  
  /**
   * Encode a string as a properly escaped JavaScript string, complete with
   * quotes.
   * @param {string} string Text to encode.
   * @return {string} JavaScript string.
   * @private
   */
  BlocklyC.quote_ = function(string) {
    // Can't use goog.string.quote since Google's style guide recommends
    // JS string literals use single quotes.
    string = string.replace(/\\/g, '\\\\')
                   .replace(/\n/g, '\\\n')
                   .replace(/'/g, '\\\'');
    return '\'' + string + '\'';
  };
  
  /**
   * Encode a string as a properly escaped multiline JavaScript string, complete
   * with quotes.
   * @param {string} string Text to encode.
   * @return {string} JavaScript string.
   * @private
   */
  BlocklyC.multiline_quote_ = function(string) {
    // Can't use goog.string.quote since Google's style guide recommends
    // JS string literals use single quotes.
    var lines = string.split(/\n/g).map(BlocklyC.quote_);
    return lines.join(' + \'\\n\' +\n');
  };
  
  /**
   * Common tasks for generating JavaScript from blocks.
   * Handles comments for the specified block and any connected value blocks.
   * Calls any statements following this block.
   * @param {!Blockly.Block} block The current block.
   * @param {string} code The JavaScript code created for this block.
   * @param {boolean=} opt_thisOnly True to generate code for only this statement.
   * @return {string} JavaScript code with comments and subsequent blocks added.
   * @private
   */
  BlocklyC.scrub_ = function(block, code, opt_thisOnly) {
    var commentCode = '';
    // Only collect comments for blocks that aren't inline.
    if (!block.outputConnection || !block.outputConnection.targetConnection) {
      // Collect comment for this block.
      var comment = block.getCommentText();
      if (comment) {
        comment = Blockly.utils.string.wrap(comment,
            BlocklyC.COMMENT_WRAP - 3);
        commentCode += BlocklyC.prefixLines(comment + '\n', '// ');
      }
      // Collect comments for all value arguments.
      // Don't collect comments for nested statements.
      for (var i = 0; i < block.inputList.length; i++) {
        if (block.inputList[i].type == Blockly.INPUT_VALUE) {
          var childBlock = block.inputList[i].connection.targetBlock();
          if (childBlock) {
            comment = BlocklyC.allNestedComments(childBlock);
            if (comment) {
              commentCode += BlocklyC.prefixLines(comment, '// ');
            }
          }
        }
      }
    }
    var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    var nextCode = opt_thisOnly ? '' : BlocklyC.blockToCode(nextBlock);
    return commentCode + code + nextCode;
  };
  
  /**
   * Gets a property and adjusts the value while taking into account indexing.
   * @param {!Blockly.Block} block The block.
   * @param {string} atId The property ID of the element to get.
   * @param {number=} opt_delta Value to add.
   * @param {boolean=} opt_negate Whether to negate the value.
   * @param {number=} opt_order The highest order acting on this value.
   * @return {string|number}
   */
  BlocklyC.getAdjusted = function(block, atId, opt_delta, opt_negate,
      opt_order) {
    var delta = opt_delta || 0;
    var order = opt_order || BlocklyC.ORDER_NONE;
    if (block.workspace.options.oneBasedIndex) {
      delta--;
    }
    var defaultAtIndex = block.workspace.options.oneBasedIndex ? '1' : '0';
    if (delta > 0) {
      var at = BlocklyC.valueToCode(block, atId,
          BlocklyC.ORDER_ADDITION) || defaultAtIndex;
    } else if (delta < 0) {
      var at = BlocklyC.valueToCode(block, atId,
          BlocklyC.ORDER_SUBTRACTION) || defaultAtIndex;
    } else if (opt_negate) {
      var at = BlocklyC.valueToCode(block, atId,
          BlocklyC.ORDER_UNARY_NEGATION) || defaultAtIndex;
    } else {
      var at = BlocklyC.valueToCode(block, atId, order) ||
          defaultAtIndex;
    }
  
    if (Blockly.isNumber(at)) {
      // If the index is a naked number, adjust it right now.
      at = Number(at) + delta;
      if (opt_negate) {
        at = -at;
      }
    } else {
      // If the index is dynamic, adjust it in code.
      if (delta > 0) {
        at = at + ' + ' + delta;
        var innerOrder = BlocklyC.ORDER_ADDITION;
      } else if (delta < 0) {
        at = at + ' - ' + -delta;
        var innerOrder = BlocklyC.ORDER_SUBTRACTION;
      }
      if (opt_negate) {
        if (delta) {
          at = '-(' + at + ')';
        } else {
          at = '-' + at;
        }
        var innerOrder = BlocklyC.ORDER_UNARY_NEGATION;
      }
      innerOrder = Math.floor(innerOrder);
      order = Math.floor(order);
      if (innerOrder && order >= innerOrder) {
        at = '(' + at + ')';
      }
    }
    return at;
  };

BlocklyC.init = function(a) {
    BlocklyC.definitions_=Object.create(null);
    BlocklyC.functionNames_=Object.create(null);
    BlocklyC.variableDB_?BlocklyC.variableDB_.reset():BlocklyC.variableDB_=new Blockly.Names(BlocklyC.RESERVED_WORDS_);
    BlocklyC.variableDB_.setVariableMap(a.getVariableMap());
    for(var b=[],c=Blockly.Variables.allDeveloperVariables(a),d=0;d<c.length;d++){
        b.push(BlocklyC.variableDB_.getName(c[d],Blockly.Names.DEVELOPER_VARIABLE_TYPE));

    }
    a=Blockly.Variables.allUsedVarModels(a);
    for(d=0;d<a.length;d++){
        b.push(BlocklyC.variableDB_.getName(a[d].getId(),Blockly.VARIABLE_CATEGORY_NAME));
        
    }
    
    var int = []
    var char = []
    var float = []

    for(var e = 0; e < a.length; e++){
        
        if(a[e].type=='float')
            float.push(BlocklyC.variableDB_.getName(a[e].getId(),Blockly.VARIABLE_CATEGORY_NAME));
        else if(a[e].type=='char')
            char.push(BlocklyC.variableDB_.getName(a[e].getId(),Blockly.VARIABLE_CATEGORY_NAME));
        else{
            int.push(BlocklyC.variableDB_.getName(a[e].getId(),Blockly.VARIABLE_CATEGORY_NAME));
        }
    }
    var names = ""
    if(int.length){
        names += "int "+int.join(", ")+";\n";
    }
    if(char.length){
        names += "char "+char.join(", ")+";\n";
    }
    if(float.length){
        names += "float "+float.join(", ")+";\n";
    }
    b.length&&(BlocklyC.definitions_.variables=names)
    
}
BlocklyC['controls_if'] = function(a){
    var b=0;
    var c="";
    BlocklyC.STATEMENT_PREFIX && (c+=BlocklyC.injectId(BlocklyC.STATEMENT_PREFIX,a));
    do{
        var d=BlocklyC.valueToCode(a,"IF"+b,BlocklyC.ORDER_NONE)||"";
        var e=BlocklyC.statementToCode(a,"DO"+b);
        BlocklyC.STATEMENT_SUFFIX&& (e=BlocklyC.prefixLines(BlocklyC.injectId(BlocklyC.STATEMENT_SUFFIX,a),BlocklyC.INDENT)+e);
        c+=(0<b?" else ":"")+"if ("+d+") {\n"+e+"}";++b
    }while(a.getInput("IF"+b));
    if(a.getInput("ELSE")||BlocklyC.STATEMENT_SUFFIX){
        var e = BlocklyC.statementToCode(a,"ELSE")
        BlocklyC.STATEMENT_SUFFIX&&(e=BlocklyC.prefixLines(BlocklyC.injectId(BlocklyC.STATEMENT_SUFFIX,a),BlocklyC.INDENT)+e)
        c+=" else {\n"+e+"}";
    }
    return c+"\n"
}

BlocklyC['logic_negate'] = function(a){
    var b=BlocklyC.ORDER_LOGICAL_NOT;
    return["!"+(BlocklyC.valueToCode(a,"BOOL",b)||""),b]
};

BlocklyC['logic_operation'] = function(a) {
   
    var b="AND"==a.getFieldValue("OP")?"&&":"||";
    var c = "&&" == b? BlocklyC.ORDER_LOGICAL_AND:BlocklyC.ORDER_LOGICAL_OR;
    var d=BlocklyC.valueToCode(a,"A",c);
    a=BlocklyC.valueToCode(a,"B",c);
    if(d||a){
        var e="&&"==b?"true":"";
        d||(d=e);
        a||(a=e)
    }else 
        a=d="";
    return[d+" "+b+" "+a,c]
}


BlocklyC['logic_compare'] = function(a) {
    var b= {
        EQ:"==",
        NEQ:"!=",
        LT:"<",
        LTE:"<=",
        GT:">",
        GTE:">="
    }
    [a.getFieldValue("OP")]
    var c = "==" ==b || "!="==b?BlocklyC.ORDER_EQUALITY:BlocklyC.ORDER_RELATIONAL
    
    var d=BlocklyC.valueToCode(a,"A",c)||"";
    a=BlocklyC.valueToCode(a,"B",c)||"";
    return[d+" "+b+" "+a,c]
}

/**Matemática */
BlocklyC['math_number']=function(a){
    a=Number(a.getFieldValue("NUM"));
    return[a,0<=a?BlocklyC.ORDER_ATOMIC:BlocklyC.ORDER_UNARY_NEGATION]
};


BlocklyC['text']=function(a){
  return[BlocklyC.quote_(a.getFieldValue("TEXT")),BlocklyC.ORDER_ATOMIC]
};
/**Repetição */

BlocklyC['controls_whileUntil']=function(a){
    var b="UNTIL"==a.getFieldValue("MODE");
    var c=BlocklyC.valueToCode(a,"BOOL",b?BlocklyC.ORDER_LOGICAL_NOT:BlocklyC.ORDER_NONE)||"";
    var d=BlocklyC.statementToCode(a,"DO");
    d=BlocklyC.addLoopTrap(d,a);
    b&&(c="!"+c);
    return"while ("+c+") {\n"+d+"}\n"
};

BlocklyC['controls_flow_statements'] = function(a){
    var b="";
    BlocklyC.STATEMENT_PREFIX&&(b+=BlocklyC.injectId(BlocklyC.STATEMENT_PREFIX,a));
    BlocklyC.STATEMENT_SUFFIX&&(b+=BlocklyC.injectId(BlocklyC.STATEMENT_SUFFIX,a));
    if(BlocklyC.STATEMENT_PREFIX){
        var c=Blockly.Constants.Loops.CONTROL_FLOW_IN_LOOP_CHECK_MIXIN.getSurroundLoop(a);
        c&&!c.suppressPrefixSuffix&&(b+=BlocklyC.injectId(BlocklyC.STATEMENT_PREFIX,c))
    }
    switch(a.getFieldValue("FLOW")){
        case "BREAK":return b+"break;\n";
        case "CONTINUE":return b+"continue;\n"
    }
    throw Error("Unknown flow statement.");

}
BlocklyC['controls_for'] =function(a){
    var b=BlocklyC.variableDB_.getName(a.getFieldValue("VAR"),'VARIABLE')
    var c=BlocklyC.valueToCode(a,"FROM",BlocklyC.ORDER_ASSIGNMENT)||"0"
    var d=BlocklyC.valueToCode(a,"TO",BlocklyC.ORDER_ASSIGNMENT)||"0"
    var e=BlocklyC.valueToCode(a,"BY",BlocklyC.ORDER_ASSIGNMENT)||"1"
    var f=BlocklyC.statementToCode(a,"DO");
    f=BlocklyC.addLoopTrap(f,a);
    
    
    d+=''
    d.match(/^\w+$/)||Blockly.isNumber(d)
    if(Blockly.isNumber(c)&&Blockly.isNumber(d)&&Blockly.isNumber(e)){
        var g=Number(c)<=Number(d);
        a="for ("+b+" = "+c+"; "+b+(g?" <= ":" >= ")+d+"; "+b;
        b=Math.abs(Number(e));a=(1==b?a+(g?"++":"--"):a+((g?" += ":" -= ")+b))+(") {\n"+f+"}\n")
    }else{ 
        a=""
        g=c
        c.match(/^\w+$/)||true||(g=BlocklyC.variableDB_.getDistinctName(b+"_start",Blockly.VARIABLE_CATEGORY_NAME))
        a+="var "+g+" = "+c+";\n";
        c=d
        d.match(/^\w+$/)||Blockly.isNumber(d)||(c=BlocklyC.variableDB_.getDistinctName(b+"_end",Blockly.VARIABLE_CATEGORY_NAME));
        a+="var "+c+" = "+d+";\n";
        d=BlocklyC.variableDB_.getDistinctName(b+"_inc",Blockly.VARIABLE_CATEGORY_NAME)
        a+="var "+d+" = "
        a=Blockly.isNumber(e)?a+(Math.abs(e)+";\n"):a+("Math.abs("+e+");\n")
        a=a+("if ("+g+" > "+c+") {\n")+(+d+" = -"+d+";\n")
        a+="}\n"
        a+="for ("+b+" = "+g+"; "+d+" >= 0 ? "+b+" <= "+c+" : "+b+" >= "+c+"; "+b+" += "+d+") {\n"+f+"}\n";
    }
    
    return a
};

BlocklyC['math_arithmetic']=function(a){
    var b={
        ADD:[" + ",BlocklyC.ORDER_ADDITION],
        MINUS:[" - ",BlocklyC.ORDER_SUBTRACTION],
        MULTIPLY:[" * ",BlocklyC.ORDER_MULTIPLICATION],
        DIVIDE:[" / ",BlocklyC.ORDER_DIVISION],
        POWER:[null,BlocklyC.ORDER_COMMA]
    }
    [a.getFieldValue("OP")]
    var c=b[0];
    b=b[1];
    var d=BlocklyC.valueToCode(a,"A",b)||"0";
    a=BlocklyC.valueToCode(a,"B",b)||"0";
    return c?[d+c+a,b]:["pow("+d+", "+a+")",BlocklyC.ORDER_FUNCTION_CALL]
};

BlocklyC['math_modulo']=function(a){
    var b=BlocklyC.valueToCode(a,"DIVIDEND",BlocklyC.ORDER_MODULUS)||"0";
    a=BlocklyC.valueToCode(a,"DIVISOR",BlocklyC.ORDER_MODULUS)||"0";
    return[b+" % "+a,BlocklyC.ORDER_MODULUS]
};

BlocklyC.text_length=function(a){
    return[(BlocklyC.valueToCode(a,"VALUE",BlocklyC.ORDER_FUNCTION_CALL)||"''")+".strlen()",BlocklyC.ORDER_MEMBER]
};

BlocklyC['variables_get']=function(a){
    
    return[BlocklyC.variableDB_.getName(a.getFieldValue("VAR"),Blockly.VARIABLE_CATEGORY_NAME),BlocklyC.ORDER_ATOMIC]
};
BlocklyC['variables_get_char']=function(a){
    
    return[BlocklyC.variableDB_.getName(a.getFieldValue("VAR"),Blockly.VARIABLE_CATEGORY_NAME),BlocklyC.ORDER_ATOMIC]
};

BlocklyC['variables_get_float']=function(a){
    
    return[BlocklyC.variableDB_.getName(a.getFieldValue("VAR"),Blockly.VARIABLE_CATEGORY_NAME),BlocklyC.ORDER_ATOMIC]
};

BlocklyC['variables_get_dynamic']=function(a){
    return[BlocklyC.variableDB_.getName(a.getFieldValue("VAR"),Blockly.VARIABLE_CATEGORY_NAME),BlocklyC.ORDER_ATOMIC]
};

BlocklyC['variables_set_dynamic']=function(a){
    var b=BlocklyC.valueToCode(a,"NAME",BlocklyC.ORDER_ASSIGNMENT)||"";
    return BlocklyC.variableDB_.getName(a.getFieldValue("VAR"),Blockly.VARIABLE_CATEGORY_NAME)+" = "+b+";\n"    

};

BlocklyC['text_prompt_text'] = function(a){
    let code = ''
    //const code = 'printf("'+(BlocklyC.valueToCode(a,"TEXT",BlocklyC.ORDER_NONE)||"0")+'");\n'
    const text = BlocklyC.valueToCode(a,"Leia",BlocklyC.ORDER_NONE)||null;
    
    if(text == null){
        code='scanf()';
    }
    else{
        const vars = Blockly.Variables.allUsedVarModels(a.workspace)
        for(var i = 0; i < vars.length; i++){
            let block = vars[i]
            console.log(block.type)
            if(block.name === text){
                const mask = block.type=='char'?"%c":block.type=='float'?"%f":"%d"
                code = 'scanf("'+mask+'", &'+text+');'
                
            }
            
        }
    }
    return code+'\n'

}

BlocklyC['text_print']=function(a){
    
    let code = ''
    //const code = 'printf("'+(BlocklyC.valueToCode(a,"TEXT",BlocklyC.ORDER_NONE)||"0")+'");\n'
    const text = BlocklyC.valueToCode(a,"TEXT",BlocklyC.ORDER_NONE)||"0"
    
    if(text.indexOf("'") != -1){
        code='printf("'+text.substring(1, text.length-1)+'\\n");';
    }
    else if(parseInt(text) || text==0){
        code='printf("'+text+'\\n");';
    }
    else{
        const vars = Blockly.Variables.allUsedVarModels(a.workspace)
        for(var i = 0; i < vars.length; i++){
            let block = vars[i]
            console.log(block.type)
            if(block.name === text){
                const mask = block.type=='char'?"%c":block.type=='float'?"%f":"%d"
                code = 'printf("'+mask+'", '+text+');'
                
            }
            
        }
    }
    return code+'\n'
    
};

BlocklyC['text']=function(a){
    return[BlocklyC.quote_(a.getFieldValue("TEXT")),BlocklyC.ORDER_ATOMIC]
}

BlocklyC.quote_=function(a){
    a=a.replace(/\\/g,"\\\\").replace(/\n/g,"\\\n").replace(/'/g,"\\'");return"'"+a+"'"
};

export {BlocklyC}