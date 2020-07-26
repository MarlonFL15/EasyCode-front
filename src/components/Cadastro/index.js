import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import colors from '../Colors'
const useStyles = makeStyles((theme)=>({
    right: {
        backgroundColor: "#FFF",
        borderRadius: '20px 0 0 20px',
        [theme.breakpoints.down('xs')]: {
            borderRadius: 0,
        }
    },
    left: {
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
        justify="flex-end"
        >
            <Grid item 
            className={classes.left}
            item xs={12} sm={6} md={8} >
                teste
            </Grid>
            <Grid item xs={12} sm={6} md={4}
            className={classes.right}>
aa
            </Grid>
        </Grid>
    )
}