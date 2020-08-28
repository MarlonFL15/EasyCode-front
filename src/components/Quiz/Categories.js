import React from 'react';
import { withStyles, makeStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { Grid, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions'
import { Redirect, useHistory, Link} from "react-router-dom";
import colors from './../Colors'
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
    padding:25
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
    fontFamily: 'Quicksand, sans-serif',
    fontSize: 40,
  },
  seeAll: {
    fontFamily: 'Nunito, sans-serif',
    fontSize: 20,
    color: colors.blue,
    fontWeight: 500,
  }
}));


const assuntos = [
  {nome: 'Matemática', link: '/quiz/responder', cor: colors.blue, icon: '+-*/'},
  {nome: 'Seleção', link: '/quiz/responder', cor: colors.green, icon: 'if()'},
  {nome: 'Sequência', link: '/quiz/responder', cor: colors.red, icon:(<div><TrendingFlatIcon style={{ fontSize: 60 }}/><TrendingFlatIcon style={{ fontSize: 60 }}/></div>)},
  {nome: 'Repetição', link: '/quiz/responder', cor: colors.yellow, icon: (<LoopIcon style={{ fontSize: 60 }}/>)},
  {nome: 'Textos', link: '/quiz/responder', cor: colors.blue, icon: 'abc'},

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
            <div className={classes.card} onClick={(event) => {history.push(link, {assunto:nome}); history.go(0)}}
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
            <h2 className={classes.title}>Escolha uma categoria para praticar</h2>
            {/* <h2 className={classes.seeAll}>Visualizar todas as questoes</h2> */}
            
            {/* <Paper component="form" className={classes.search}>
            <InputBase
                className={classes.input}
                placeholder="Pesquisar"
                value = {value}
                onChange={changeValue}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
        <Table search={value}/> */}
        <Grid container justify="center">
        {assuntos.map(item=>{
              return(
                <Card card={item}/>
              )
            })}
        </Grid>
        
    </div>
  );
}
