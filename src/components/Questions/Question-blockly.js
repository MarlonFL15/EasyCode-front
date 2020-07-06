import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    overflowY: 'scroll',
    overflowX: 'hidden',
    height: '40%',
    
   
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    fontSize: 16,
  },
  pos: {
    fontSize: 14,
    marginBottom: 18,
  },
  easy: {
    marginBottom:5,
    color: 'white',
    backgroundColor: '#79d70f',
    padding:5,
  }
});

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
          Olá mundo
        </Typography>
        
        <Typography className={classes.pos} color="textSecondary">
          Faça um programa que imprima olá mundo na tela.
        </Typography>
        <Typography  style={{marginBottom:'5px'}} color="textSecondary">
        
        <span className={classes.easy}>Fácil</span>
        
        
        </Typography>
      </CardContent>
    </Card>
  );
}