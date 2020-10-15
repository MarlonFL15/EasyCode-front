import React, { useEffect, useState } from 'react'
import Blockly from '../Questions'
import { Grid, Divider, Typography, LinearProgress, Box } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import colors from '../Colors'
import UserSVG from './../assets/user.svg'
import { getToken } from '../auth'
import axios from '../../bd/client'
import CodeIcon from '@material-ui/icons/Code';
import { Redirect, useHistory } from "react-router-dom";
import Conquistas from './Conquistas'
import CheckIcon from '@material-ui/icons/Check';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import CloseIcon from '@material-ui/icons/Close';


const Text = withStyles({
    root: {
        fontFamily: 'Quicksand, sans-serif'
    },
})(Typography);

const useStyles = makeStyles((theme) => ({
    top: {
        height: '100%',
        minHeight: 280,
        backgroundColor: colors.blue,
        borderRadius: 10,
        padding: 15,
        margin: 6,
        color: '#fff',
        textAlign: 'center',
        '& img': {
            height: 100,
            marginTop: 10
        }
    },
    bagde:{
        width:100,
        marginTop:16,
        marginBottom:16,
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    icon: {
        width:50,
        height: 50,
        backgroundColor: 'red',
        borderRadius: 25,
        marginBottom:5

    }
}))
export default props => {
    const classes = useStyles()
    const history = useHistory()


    useEffect(() => {
        // Atualiza o titulo do documento usando a API do browser
    }, []);

    const Badge = (props) => {
        return(
            <div className={classes.bagde}>
                
                {/* <img width="64px" src="/media/Conquistas/6.png"></img> */}
                <div className={classes.icon} style={{backgroundColor:props.color}}></div>
                <div style={{'flex-wrap': 'wrap'}}>
                    {props.titulo}
                </div>
            </div>
        )
    }

    
    const array = [
        {
            titulo:'Olá mundo',
            color:'red'
        },
        {
            titulo:'Primeiro quiz',
            color:'green'
        },
        {
            titulo:'Tentando a sorte',
            color:'yellow'
        },
        {
            titulo:'Acertando tudo',
            color:'red'
        },
        {
            titulo:'De tudo um pouco',
            color:'green'
        },
        {
            titulo:'Ora ora...',
            color:'white'
        },
        {
            titulo:'Nível Einstein',
            color:'black'
        },
        {
            titulo:'Programador iniciante',
            color:'green'
        },
        {
            titulo:'Programador intermediário',
            color:'yellow'
        },
        {
            titulo:'Programador avançado',
            color:'red'
        },
        {
            titulo:'Solucionador de problemas',
            color:'white'
        },
        {
            titulo:'Sherlock Holmes',
            color:'yellow'
        },
        {
            titulo:'Viciado em quiz',
            color:'white'
        },
        {
            titulo:'Viciado na sorte',
            color:'green'
        },
    ]
    return (
        <div className={classes.top}>
            <Text variant="h6" style={{ textAlign: 'center' }}><b>Conquistas</b></Text>
            <Grid container className={classes.wraper}>
                {array.map(el => {
                    return <Grid item><Badge {...el}></Badge></Grid>
                })}
            </Grid>
        </div>
    )
}