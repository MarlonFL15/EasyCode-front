import React from 'react';
import { withStyles, makeStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions'
import { Redirect, useHistory } from "react-router-dom";
import Table from './Table'

const useStyles = makeStyles((theme: Theme) => createStyles({
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
  }
}));


export default function Container() {
    const [value, setValue] = React.useState('')
    const classes = useStyles();
    const changeValue = (event) =>{
        console.log('tá mudando')
        setValue(event.target.value)
    }
    return (
        <div className={classes.root}>
            Se você quiser praticar ou blablabla
            <Paper component="form" className={classes.search}>
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
        <Table search={value}/>
    </div>
  );
}
