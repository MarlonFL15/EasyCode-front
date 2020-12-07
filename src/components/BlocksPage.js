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
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
  
}));

export default function BlocksPage(props) {
  const [value, setValue] = React.useState('')
  const classes = useStyles();
  

  return (
    <div className={classes.root}>
      <div className="top" style={{ padding: 7, background: colors.blue, width: '100%', position: 'absolute', top: 0, left: 0, zIndex: -1 }} />

      <h2 className={classes.title}>Escolha uma questão para praticar</h2>
      <Card variant="outlined" style={{ padding: '20px 30px', width: 'calc(100% - 100px)', border: 'none', minWidth: 300, marginBottom: 30 }}>
        {props.blockContainer}
      </Card>
      <Card variant="outlined" style={{ padding: '20px 30px', width: 'calc(100% - 100px)', border: 'none', minWidth: 300, marginBottom: 30 }}>
        {props.codeResult}
      </Card>
    </div>
  );
}
