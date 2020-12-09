import React from 'react';
import { withStyles, makeStyles, createStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import { Redirect, useHistory, Link } from "react-router-dom";
import colors from '../Colors'
import Roleta from '../Roleta/Roleta';

const useStyles = makeStyles((theme) => createStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    color: '#FFF',
    height: 290,
    position: 'relative',
    textAlign: 'center',
    fontFamily: 'Quicksand, sans-serif',
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
    cursor: 'pointer',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  cardIcon: {
    height: 250,
    margin: 'auto',
    alignItems: 'center',
    display: 'flex',
    position: 'absolute',
    right: 20,
    top: -25,
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
  },
  top: {
    padding: 7,
    background: colors.blue,
    width: '100%',
    height: 300,
    paddingTop: 80,
    paddingBottom: 30,
    marginBottom: 50,
    [theme.breakpoints.down('sm')]: {
      height: 350,
    },
    [theme.breakpoints.down('xs')]: {
      height: 610,
    },

  }
}));


const assuntos = [
  { nome: 'Sequência', link: '/quiz/responder', cor: colors.red, icon: require('./sequencia.svg') },
  { nome: 'Seleção', link: '/quiz/responder', cor: colors.yellow, icon: require('./selecao.svg') },
  { nome: 'Repetição', link: '/quiz/responder', cor: colors.green, icon: require('./repeticao.svg') },

]

export default function Container() {
  const classes = useStyles();
  const history = useHistory()

  const Card = (props) => {
    const classes = useStyles();
    const { nome, icon, link, cor } = props.card;
    return (
      <Grid item className={classes.cardContainer} md={4} sm={6} xs={12}
      >
        <div className={classes.card} onClick={(event) => { history.push(link, { assunto: nome }); history.go(0) }}
          style={{ backgroundColor: cor }}>
          <img className={classes.cardIcon} src={icon} />
          <h2 style={{
            position: 'absolute',
            bottom: 30,
            left: 30
          }}>{nome}</h2>
        </div>
      </Grid>
    )
  }

  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <Grid container justify="center">
          <Grid item md={4} sm={4}>
            <Roleta />
          </Grid>
          <Grid item md={6} sm={7}>
            <h2 className={classes.title}>Vamos testar seus conhecimentos de programação?</h2>
            <h2 className={classes.subtitle}>Você pode rodar a roleta para sortear um tema ou escolher manualmente nos paineis abaixo.</h2>

          </Grid>

        </Grid>

      </div>


      <Grid container justify="center" style={{ maxWidth: 1200 }}>
        {assuntos.map(item => {
          return (
            <Card card={item} />
          )
        })}
      </Grid>

    </div>
  );
}
