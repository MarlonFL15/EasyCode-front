import React, { useState } from 'react'
import { Grid, Button, Typography } from '@material-ui/core'
import Left from '../assets/left-roleta.svg'
import Right from '../assets/right-roleta.svg'
import colors from '../Colors'
import axios from '../../bd/client'
import {getToken} from '../auth'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Zoom from '@material-ui/core/Zoom';
import clsx from "clsx";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


import { Redirect, useHistory } from "react-router-dom";

const randomDeg = ()=>{
 return 720 + 36 + (72 * Math.floor(Math.random() * 5))
}

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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
});

export default function Roleta() {
    const [spin, setSpin] = useState(false)
    const [ deg, changeDeg ] = useState(randomDeg)

    const history = useHistory()
    const useStyles = makeStyles((theme) => ({
        spin: {
            width: 350,
            height: 350,
            margin: '0 auto',
            transform: 'rotate(' + 360 * Math.random() + 'deg)'
        },
        spinOn: {
            animation: `$spin 5000ms ${theme.transitions.easing.easeInOut}`
        },
        '@keyframes spin': {
            '60%': {
                transform: 'rotate(' + deg + 'deg)',
            },
            '100%': {
                transform: 'rotate(' + deg  + 'deg)',
            },
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            outline: 'none',
            padding: theme.spacing(2, 4, 3),
        },
        arrow: {
            margin: '0 auto',
            zIndex: 1,
            fontSize: 100,
            marginBottom: -70,
            color: "#FFF"
        }
    }))

   
    const [open, setOpen] = React.useState(false);

    const classes = useStyles()
    const assuntos = ['Textos', 'Sequência', 'Repetição', 'Seleção', 'Matemática']


    const handleOpen = () => {
        setSpin(false)
        setOpen(true)
        
    };

    const funcSpin = () =>{
        axios.get("checkConquista", {params: {
            idUsuario: getToken(),
            idConquista:3
        }}).then(r => {
            
            if(!r.data){
                var event = new CustomEvent('achievement',  {'detail': {
                    conquista: [3]
                }})
                window.dispatchEvent(event)
            }
            
        })
        setSpin(true)
    }

    const handleClose = (str) => {
        setOpen(false)
        if(str==='novamente'){
            changeDeg(randomDeg)
            setSpin(true)
        }
        else{
            axios.get('getRoleta',{
                params:{
                    assunto: assuntos[(deg - 36 - 720) / 72]
                }
            }).then(response => {
                //console.log(response.data[0].id)
                history.push({
                    pathname: '/questao',
                    state: {
                        id: response.data[0].id,
                        roleta: true
                    }
                })
                
            }).catch(err => {
                console.log(err)
            })
        }
    };

    if (spin) {
        setTimeout(handleOpen, 4000)
    }
    
    return (
        <Grid container
            style={{
                display: 'flex',
                height: '100%'
            }}>
            <Grid item sm={12} md={8} style={{ paddingBottom: 10 }}>
                <Grid item sm={12}
                    style={{
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end'
                    }}>
                    <ArrowDropDownIcon className={classes.arrow}/>
                    <img src={Right} className={clsx(classes.spin, {
                        [classes.spinOn]: spin
                    })} />
                </Grid>
                <Grid item sm={12} style={{ textAlign: 'center' }}>
                    <SpinButton size="medium" variant="contained"
                        onClick={() => funcSpin()}>Girar</SpinButton>
                </Grid>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Sortear questão"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Resolver uma questão de {assuntos[(deg - 36 - 720) / 72]}?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose('novamente')} color="primary">
                            Girar novamente
                        </Button>
                        <Button onClick={() => handleClose('responder')} color="primary">
                            Sim
                        </Button>
                    </DialogActions>
                </Dialog>
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