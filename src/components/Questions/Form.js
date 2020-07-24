import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';  
import QuestionRadio from './Question-Radio'
import QuestionText from './Question-Text'
import { Card } from '@material-ui/core';
const questions = [
  {
    type:'radio',
    titulo:'O que o código abaixo retorna?',
    code: "print('eae carai')",
    alternativas:['eae carai', 'print(eae carai)', 'não retorna nada'],
    resposta:''
  },
  {
    type:'text',
    titulo:'O que o código abaixo retorna?',
    code: "print('eae carai')",
    resposta:''
  },
  {
    type:'radio',
    titulo:'titulo',
    code: 'code',
    alternativas:['op1', 'op2', 'op3'],
    resposta:''
  },
  {
    type:'radio',
    titulo:'Titulo',
    alternativas:['op1', 'op2', 'op3'],
    resposta:''
  },
]

const styles = theme => ({
  root: {
    height: '100%',
    display:'flex',
    flexDirection:'column',
    alignItems: 'center',
  },
  wrapper: {
    width:'80%',
    maxWidth:400,
},
});

class SwipeableTextMobileStepper extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  submit = event => {
    questions.map(element => console.log(element.resposta))
    
    alert('enviou')
  };

  changeResposta = (event, id) => {
    questions[id].resposta = event.target.value
  }
  render() {
    const { classes, theme } = this.props;
    const { activeStep } = this.state;
    const maxSteps = questions.length;
    const nextButton = maxSteps-1 === activeStep ? 
      <Button size="small" onClick={this.submit}>
        <span style={{fontSize:12, margin:'0 5px'}}>Enviar</span>
        <KeyboardArrowRight />
      </Button>:
      <Button size="small" onClick={this.handleNext}>
        <span style={{fontSize:12, margin:'0 5px'}}>Próximo</span>
        <KeyboardArrowRight />
      </Button>
    return (
      <div className={classes.root}>
        <MobileStepper
                variant="progress"
                steps={maxSteps}
                position="static"
                activeStep={this.state.activeStep}
                className={classes.wrapper}
                nextButton={
                  nextButton
                }
                backButton={
                    <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                    <KeyboardArrowLeft />
                    <span style={{fontSize:12, margin:'0 5px'}}>Anterior</span>
                    </Button>
                }
            />
        
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
          className={classes.wrapper}
        >
          
          {questions.map((question, index) => (
            <Card key={index}>
              {!(Math.abs(activeStep - index) <= 2) ?
                null 
              : question.type=='radio'? <QuestionRadio change = {this.changeResposta} id={index} {...question}/>:
                                        <QuestionText change = {this.changeResposta} id={index} {...question}/>}
              </Card>
          ))}
        </SwipeableViews>
        
      </div>
    );
  }
}
SwipeableTextMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SwipeableTextMobileStepper);
