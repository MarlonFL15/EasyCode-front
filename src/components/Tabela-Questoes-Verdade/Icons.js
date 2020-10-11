import React, {Component} from 'react';
import { withStyles, makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => createStyles({
    table: {
    },
    root:{
      width:'100%',
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems: 'center',
      padding:25
    },
    nivel:{
      color:'white',
      fontWeight:'bold',
    },
    nivelfacil:{
      padding:2,
      backgroundColor:'#4CAF50'
    }, 
    nivelmedio:{
      padding:2,
      backgroundColor:'#ff9800'
    },
    niveldificil:{ 
      padding:2,
      backgroundColor: '#F44335'   
    }
  }));

  
    
export default function Nivel(props){
    const classes = useStyles()
    const classNivel = props.nivel=='Fácil' || props.nivel == 'Muito Fácil'?classes.nivelfacil:props.nivel=='Médio' || props.nivel=='Normal'?classes.nivelmedio:classes.niveldificil;
    return(
        <div className={classes.nivel}>
            <div className={classNivel}>    
            {props.nivel}
            </div>
        </div>
    )
  }
//   function feito(classes){
//     const classNivel = nivel=='Fácil'?classes.nivelfacil:nivel=='Médio'?classes.nivelmedio:classes.niveldificil;
//     return(
//         <div className={classes.nivel}>
//             <div className={classes.nivelfacil}>
//                 OK
//             </div>
//         </div>
//     )
//   }