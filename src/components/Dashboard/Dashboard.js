import React, {useEffect, useState} from 'react'
import Blockly from '../Questions'
import { Grid, Divider, Typography } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import colors from '../Colors'
import UserSVG from './../assets/user.svg'
import {getToken} from '../auth'
import axios from '../../bd/client'
import { Redirect, useHistory } from "react-router-dom";

const Text = withStyles({
    root: {
        fontFamily: 'Quicksand, sans-serif'
    },
  })(Typography);
  
const useStyles = makeStyles((theme)=>({
    top: {
        height: '50%',
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
    bottom: {
        backgroundColor: colors.blue,
        height: '30%',
        minHeight: 180,
        borderRadius: 10,
        margin: 6,
    }
}))
export default props =>{
    const [nome, setNome]=  useState('')
    const [email, setEmail]=  useState('')
    const [foto, setFoto]=  useState(null)

    const classes = useStyles()
    const history = useHistory()
    

    useEffect(() => {
        // Atualiza o titulo do documento usando a API do browser
        axios.get('getUserById/'+getToken()).then(response =>{
            setEmail(response.data[0].email)
            setNome(response.data[0].nome)

            /**
             * Recupera a imagem do perfil
             */
            if(response.data[0].foto){
                const enc = new TextDecoder("utf-8");
                const arr = new Uint8Array(response.data[0].foto.data);
                const downloadUrl = enc.decode(arr)
                console.log(downloadUrl)
                setFoto(downloadUrl)
            }
            
        }).catch(err => {

        })
       
      });


    return(
        <Grid container style={{padding: 7}}>
            <Grid item sm={4}>
                <div className={classes.top}>
                    <Text variant="h6" style={{textAlign: 'center'}}><b>Meu perfil</b></Text>
                    <img src={foto ? foto:UserSVG}/>
                    <Text variant="h6" style={{textAlign: 'center'}}>{nome}</Text>
                    <Text variant="h6" style={{textAlign: 'center'}}>Nivel X</Text>
                    <Text variant="h6" style={{textAlign: 'center'}}>{email}</Text>
                </div>
            </Grid>
            <Grid item sm={8}>
                <div className={classes.top}>
                    <Text variant="h6" style={{textAlign: 'center'}}><b>Conquistas</b></Text>
                </div>
            </Grid>
            <Grid container sm={12} spacing={1} 
            style={{marginTop: 10, padding: '0 5px', marginBottom: 10}}>
                <Grid item sm={12}>
                    <Divider light />
                </Grid>  
                <Grid item sm={12}
                style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Text variant="h6"><b>Histórico de atividades</b></Text>
                    <Text variant="h6" > veja mais</Text>
                </Grid>
            </Grid>
            <Grid item sm={4}>
                <div className={classes.bottom}>
                    
                </div>
            </Grid>
            <Grid item sm={4}>
                <div className={classes.bottom}>
                    
                </div>
            </Grid>
            <Grid item sm={4}>
                <div className={classes.bottom}>
                    
                </div>
            </Grid>
        </Grid>
    )
}