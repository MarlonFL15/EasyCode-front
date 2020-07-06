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
import { Card } from '@material-ui/core';

const questions = [
  {
    titulo:'O que o código abaixo retorna?',
    code: "print('eae carai')",
    alternativas:['eae carai', 'print(eae carai)', 'não retorna nada']
  },
  {
    titulo:'titulo1',
    code: 'code',
    alternativas:['op1', 'op2', 'op3']
  },
  {
    titulo:'titulo1',
    code: 'code',
    alternativas:['op1', 'op2', 'op3']
  },
  {
    titulo:'titulo1',
    alternativas:['op1', 'op2', 'op3']
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

  render() {
    const { classes, theme } = this.props;
    const { activeStep } = this.state;
    const maxSteps = questions.length;
    
    return (
      <div className={classes.root}>
        <MobileStepper
                variant="progress"
                steps={maxSteps}
                position="static"
                activeStep={this.state.activeStep}
                className={classes.wrapper}
                nextButton={
                    <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps}>
                    <span style={{fontSize:12, margin:'0 5px'}}>Próximo</span>
                    <KeyboardArrowRight />
                    </Button>
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
              {Math.abs(activeStep - index) <= 2 ? (
                <QuestionRadio {...question} />
                
              ) : null}
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
