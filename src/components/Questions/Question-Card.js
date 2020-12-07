import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import nivel from '../Tabela-Questoes/Icons'
const useStyles = makeStyles({
  root: {
    display: 'flex',
    border: 'none'
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
  nivel:{
    color:'white',
    fontWeight:'bold',
    width:54,
    marginBottom:15,
    textAlign:'center',
  },
  nivelfacil:{
    backgroundColor:'#4CAF50'
  }, 
  nivelmedio:{
    backgroundColor:'#ff9800'
  },
  niveldificil:{ 
    backgroundColor: '#F44335'   
  },
  table:{
    width:'100%',
    display:'flex',
  },
  border:{
    padding:5,
    width:'50%',
    border: '1px solid black',
  },
  contentFooter:{
    marginTop:15,
    display:'flex',
    justifyContent:'space-between'
  }
});

export default function SimpleCard(props) {
  const classes = useStyles();
  const classNivel = props.nivel=='Fácil'?classes.nivelfacil:props.nivel=='Médio'?classes.nivelmedio:classes.niveldificil;
  console.log(props)
  
  return (
    <Card className={classes.root} variant='outlined'>
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
          {props.titulo}
        </Typography>
        
        <Typography className={classes.pos} color="textSecondary">
          {props.enunciado}
        </Typography>
        <div className={classes.nivel}>
          <div className={classNivel}>    
            {props.nivel}
          </div>
              
        </div>
        <Typography  style={{marginBottom:'5px'}} color="textSecondary">        

          <Typography className={classes.table}>
            <div className={classes.border}>
              Entrada:
              <br></br>
              {props.exemplos? props.exemplos[0].entrada:false}
            </div>
            <div className={classes.border} style={{borderLeft:0}}>
              Saída:
              <br></br>
              {props.exemplos? props.exemplos[0].saida:false}
            </div>
          </Typography>

          <Divider></Divider>
          <div className={classes.contentFooter}>
           
            <Button onClick={props.submit} size="small" variant="contained" color="primary">
              Submeter código
            </Button>
          </div>
          
        </Typography>
        
      </CardContent>
    </Card>
  );
}