import React from 'react';
import { withStyles, makeStyles, createStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import { Redirect, useHistory, Link} from "react-router-dom";
import colors from '../Colors'
import LoopIcon from '@material-ui/icons/Loop';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';

const useStyles = makeStyles((theme) => createStyles({
  table: {
  },
  root:{
    width:'100%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems: 'center',
  },
  search: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 350,
    margin:'15px 0',
    [theme.breakpoints.down('sm')]:{
        width:'100%',
    }
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
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
  },
  cardContainer: {
    color:'#FFF',
    height: 290, 
   textAlign: 'center',
   fontFamily: 'Quicksand, sans-serif'  
  },
  card: {
    width: '95%',
    minWidth: 220,
    height: '90%',
    fontFamily: 'Nunito, sans-serif',
    fontSize: 25,
    margin: '10px auto',
    borderRadius: 10,
    padding: 15,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  cardIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    width: 150,
    height: 150,
    margin: 'auto',
    borderRadius: 100,
    alignItems: 'center',
    display:  'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    fontSize: 50,
    fontWeight: 700,
    fontFamily: 'Roboto, sans-serif',
  },
  title: {
    fontSize: 32,
    color: '#FFFFFF'
  },
  subtitle: {
    marginTop: 10,
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 300
  },
  seeAll: {
    fontFamily: 'Nunito, sans-serif',
    fontSize: 20,
    color: colors.blue,
    fontWeight: 500,
  }
}));


const assuntos = [
  {nome: 'Sequência', link: '/questoes', cor: colors.red, icon:(<div><TrendingFlatIcon style={{ fontSize: 60 }}/><TrendingFlatIcon style={{ fontSize: 60 }}/></div>)},
  {nome: 'Seleção', link: '/dashboard', cor: colors.green, icon: 'if()'},
  {nome: 'Repetição', link: '/questoes', cor: colors.yellow, icon: (<LoopIcon style={{ fontSize: 60 }}/>)},

]

export default function Container() {
    const [value, setValue] = React.useState('')
    const classes = useStyles();
    const history = useHistory()
    
    const changeValue = (event) =>{
        console.log('tá mudando')
        setValue(event.target.value)
    }
    const Card = (props) => {
      const classes = useStyles();
      const { nome, icon, link, cor } = props.card;
      return (
        <Grid item className={classes.cardContainer} md={4} sm={6}  xs={12}
        >
            <div className={classes.card} onClick={(event) => {history.push(link); history.go(0)}}
            style={{backgroundColor: cor, boxShadow: '0 2px 7px ' + cor,}}>
              <div className={classes.cardIcon}>
                {icon}
              </div>
              <h5>{nome}</h5>
            </div>
        </Grid>
      )
    }

    return (
        <div className={classes.root}>
            <div className="top" style={{ padding: 7, background: colors.blue, width: '100%', height: 300, paddingTop: 80, paddingBottom: 30, marginBottom: 50}}>
            <Grid container justify="center">
              <Grid item sm={5}>
                <div>Girar roleta</div>
                <Button color="secondary" variant="contained">GIRAR</Button>
              </Grid>
              <Grid item sm={5}>
                <h2 className={classes.title}>Vamos testar seus conhecimentos de programação?</h2>
                <h2 className={classes.subtitle}>Você pode rodar a roleta para sortear um tema ou escolher manualmente nos paineis abaixo.</h2>

              </Grid>

            </Grid>

            </div>

            
        <Grid container justify="center" style={{maxWidth: 1200}}>
        {assuntos.map(item=>{
              return(
                <Card card={item}/>
              )
            })}
        </Grid>
        
    </div>
  );
}
