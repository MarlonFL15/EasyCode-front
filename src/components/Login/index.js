import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import colors from '../Colors'
const useStyles = makeStyles((theme)=>({
    left: {
        backgroundColor: "#FFF",
        borderRadius: '0 20px 20px 0',
        [theme.breakpoints.down('xs')]: {
            borderRadius: 0,
        }
    },
    right: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    }
}))
export default function Login(){
    const classes = useStyles()

    return (
        <Grid container
        style={{
            height: '100%',
            display: 'flex',
            position: 'absolute',
            backgroundColor: colors.yellow
        }}
        >
            
            <Grid item xs={12} sm={6} md={4}
            className={classes.left}>

            </Grid>
            <Grid 
            item xs={12} sm={6} md={8}
            item className={classes.right}>
                bbb
            </Grid>
        </Grid>
    )
}