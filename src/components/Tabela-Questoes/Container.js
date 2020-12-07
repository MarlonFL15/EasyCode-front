import React from 'react';
import { withStyles, makeStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { Card, Grid, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions'
import { Redirect, useHistory, Link } from "react-router-dom";
import Table from './Table'
import colors from './../Colors'
import LoopIcon from '@material-ui/icons/Loop';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';

const useStyles = makeStyles((theme) => createStyles({
  table: {
  },
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 350,
    margin: '15px 0',
    backgroundColor: colors.background,
    border: 'none',
    float: 'right',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
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
  nivel: {
    color: 'white',
    fontWeight: 'bold',
  },
  nivelfacil: {
    padding: 2,
    backgroundColor: '#4CAF50'
  },
  nivelmedio: {
    padding: 2,
    backgroundColor: '#ff9800'
  },
  niveldificil: {
    padding: 2,
    backgroundColor: '#F44335'
  },
  cardContainer: {
    color: '#FFF',
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    fontSize: 50,
    fontWeight: 700,
    fontFamily: 'Roboto, sans-serif',
  },
  title: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 24,
    marginTop: 100,
    color: '#FFFFFf',
    width: 'calc(100% - 100px)',
    marginBottom: 30,
    minWidth: 200,
  },
  seeAll: {
    fontFamily: 'Nunito, sans-serif',
    fontSize: 20,
    color: colors.blue,
    fontWeight: 500,
  }
}));


const assuntos = [
  { nome: 'Matemática', link: '/roleta', cor: colors.blue, icon: '+-*/' },
  { nome: 'Seleção', link: '/dashboard', cor: colors.green, icon: 'if()' },
  { nome: 'Sequência', link: '/questoes', cor: colors.red, icon: (<div><TrendingFlatIcon style={{ fontSize: 60 }} /><TrendingFlatIcon style={{ fontSize: 60 }} /></div>) },
  { nome: 'Repetição', link: '/questoes', cor: colors.yellow, icon: (<LoopIcon style={{ fontSize: 60 }} />) },
  { nome: 'Textos', link: '/questoes', cor: colors.blue, icon: 'abc' },

]

export default function Container() {
  const [value, setValue] = React.useState('')
  const classes = useStyles();
  const history = useHistory()
  
  const changeValue = (event) => {
    console.log('tá mudando')
    setValue(event.target.value)
  }
  // const Card = (props) => {
  //   const classes = useStyles();
  //   const { nome, icon, link, cor } = props.card;
  //   return (
  //     <Grid item className={classes.cardContainer} md={4} sm={6}  xs={12}
  //     >
  //         <div className={classes.card} onClick={(event) => {history.push(link); history.go(0)}}
  //         style={{backgroundColor: cor, boxShadow: '0 2px 7px ' + cor,}}>
  //           <div className={classes.cardIcon}>
  //             {icon}
  //           </div>
  //           <h5>{nome}</h5>
  //         </div>
  //     </Grid>
  //   )
  // }

  return (
    <div className={classes.root}>
      <div className="top" style={{ padding: 7, background: colors.blue, width: '100%', position: 'absolute', top: 0, left: 0, zIndex: -1 }} />

      <h2 className={classes.title}>Escolha uma questão para praticar</h2>
      <Card variant="outlined" style={{ padding: '20px 30px', width: 'calc(100% - 100px)', border: 'none', minWidth: 300, marginBottom: 30 }}>
        <h3>Experimente também as opcões abaixo</h3>
        <ul style={{ 
          listStyle: 'none', 
          display: 'flex', 
          textAlign: 'center', 
          width: '100%', 
          justifyContent: 'center',
          
          }}>
          <li onClick={()=>history.push('/jornada')}>
            <img src={require('../assets/user.svg')}
              style={{
                height: 100,
                backgroundColor: 'red',
                width: 100,
                borderRadius: '100%'
              }} />
            <div>Jornada</div>
          </li>
          <li onClick={()=>history.push('/blocos')}>
            <img src={require('../assets/user.svg')}
              style={{
                height: 100,
                backgroundColor: 'red',
                width: 100,
                borderRadius: '100%'
              }} />
            <div> Programar Livre</div>
          </li>
          <li onClick={()=>history.push('/arduino')}>
            <img src={require('../assets/user.svg')}
              style={{
                height: 100,
                backgroundColor: 'red',
                width: 100,
                borderRadius: '100%'
              }} />
            <div>Arduino</div>
          </li>
        </ul>

        <h3>Todas as questões</h3>
        <Paper component="form" variant="outlined" className={classes.search}>
          <InputBase
            className={classes.input}
            placeholder="Pesquisar"
            value={value}
            onChange={changeValue}
          />
          <IconButton type="submit" className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Table search={value} />
      </Card>



    </div>
  );
}
