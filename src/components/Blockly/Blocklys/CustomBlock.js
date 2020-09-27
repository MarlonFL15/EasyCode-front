import Blockly from 'blockly/core';

Blockly.Blocks['text_prompt_text'] = {
    init: function() {
      this.appendValueInput("Leia")
          .setCheck(false)
          .appendField("Leia");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
     
   
    }
  };
  Blockly.Blocks['variables_set_dynamic'] = {
    init: function() {
      this.appendValueInput("NAME")
          .setCheck(null)
          .appendField("definir")
          .appendField(new Blockly.FieldVariable("item"), "VAR")
          .appendField("para ");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#9A5CA6");
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  Blockly.Blocks['variables_get_dynamic'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldVariable("item"), "VAR");
      this.setOutput(true, null);
      this.setColour("#9A5CA6");
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  
  export default Blockly