import React from 'react'
import { Grid, Button, Typography } from '@material-ui/core'
import Left from '../assets/left-roleta.svg'
import Right from '../assets/right-roleta.svg'
import colors from '../Colors'
import { withStyles } from '@material-ui/core/styles'

const SpinButton = withStyles({
    root: {
      boxShadow: '0 1px 4px 0' + colors.blue,
      fontSize: 16,
      padding: '6px 12px',
      width: 100,
      backgroundColor: colors.blue,
      fontWeight: 800,
      color: "#FFF",
      fontFamily: 'Quicksand, sans-serif',
      backgroundColor: colors.blue,
      '&:hover': {
        boxShadow: '0 1px 10px 0' + colors.blue,
        backgroundColor: colors.blue,
      },
    },
  })(Button);

export default function Roleta(){
    return (
        <Grid container
        style={{
            display:'flex',
            height: '100%'
        }}>
            <Grid container sm={12} md={8} style={{paddingBottom: 10}}>
                <Grid item sm={12} 
                style={{    
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end'
                }}>
                    <img src={Right}></img>
                </Grid>
                <Grid item sm={12} style={{textAlign: 'center'}}>
                    <SpinButton size="medium" variant="contained">Girar</SpinButton>
                </Grid>
            </Grid>
            <Grid item sm={12} md={4} 
            style={{  
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                float: 'right'
            }}>
                <img src={Left} />
            </Grid>
        </Grid>
    )
}