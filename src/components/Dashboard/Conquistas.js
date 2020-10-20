import React, { useEffect, useState } from 'react'
import Blockly from '../Questions'
import { Grid, Divider, Typography, LinearProgress, Box } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import colors from '../Colors'
import UserSVG from './../assets/user.svg'
import { getToken } from '../auth'
import axios from '../../bd/client'
import { Redirect, useHistory } from "react-router-dom";


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
    const [conquistas, setConquistas] = useState([])


    useEffect(() => {
        // Atualiza o titulo do documento usando a API do browser
        axios.get('getConquistas/'+getToken()).then(response => {
            setConquistas(response.data)
        }).catch(e => {

        })
    }, []);

    const Badge = (props) => {
        const path = props.id + (props.idUsuario?"":"-disabled")+".svg"
        return(
            <div className={classes.bagde}>
                
                {/* <img width="64px" src="/media/Conquistas/6.png"></img> */}
                <img src={"media/Conquistas/"+path}></img>
                <div style={{'flex-wrap': 'wrap'}}>
                    {props.titulo}
                </div>

            </div>
        )
    }

    return (
        <div className={classes.top}>
            <Text variant="h6" style={{ textAlign: 'center' }}><b>Conquistas</b></Text>
            <Grid container className={classes.wraper}>
                {conquistas.map(el => {
                    return <Grid item><Badge {...el}></Badge></Grid>
                })}
            </Grid>
        </div>
    )
}