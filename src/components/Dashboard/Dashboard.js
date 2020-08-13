import React from 'react'
import Blockly from '../Questions/Blockly'
import { Grid, Divider, Typography } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import colors from '../Colors'
import UserSVG from './../assets/user.svg'
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
    const classes = useStyles()
     
    return(
        <Grid container style={{padding: 7}}>
            <Grid item sm={4}>
                <div className={classes.top}>
                    <Text variant="h6" style={{textAlign: 'center'}}><b>Meu perfil</b></Text>
                    <img src={UserSVG}/>
                    <Text variant="h6" style={{textAlign: 'center'}}>Nome</Text>
                    <Text variant="h6" style={{textAlign: 'center'}}>Nivel X</Text>
                    <Text variant="h6" style={{textAlign: 'center'}}>email@email.com</Text>
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