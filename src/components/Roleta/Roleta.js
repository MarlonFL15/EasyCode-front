import React, { useEffect, useState } from 'react'
import { Grid, Button, Typography } from '@material-ui/core'
import Left from '../assets/left-roleta.svg'
import Right from '../assets/right-roleta.svg'
import colors from '../Colors'
import axios from '../../bd/client'
import { getToken } from '../auth'
import GraficoQuiz from '../Quiz/GraficoQuiz'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Zoom from '@material-ui/core/Zoom';
import clsx from "clsx";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


import { Redirect, useHistory } from "react-router-dom";
import { CONTROLS_WHILEUNTIL_HELPURL } from 'blockly/msg/en'
import GraficoSubmissoes from '../Dashboard/GraficoSubmissoes'

const randomDeg = () => {
    return 720 + 36 + (72 * Math.floor(Math.random() * 5))
}

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: '#ffffff',
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography
                style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 24,
                    color: '#FFFFFf',
                    fontWeight: 600
                }}>
                {children}
            </Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const SpinButton = withStyles({
    root: {
        boxShadow: '0 1px 4px 0' + colors.red,
        fontSize: 16,
        padding: '6px 12px',
        width: 100,
        backgroundColor: colors.red,
        fontWeight: 800,
        color: "#FFF",
        fontFamily: 'Quicksand, sans-serif',
        '&:hover': {
            boxShadow: '0 1px 10px 0' + colors.red,
            backgroundColor: colors.red,
        },
    },
})(Button);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
});




export default function Roleta() {
    const [deg, changeDeg] = useState(360 * Math.random())
    const [spin, toggleSpin] = useState(false)
    const history = useHistory()
    const [i, setI] = useState(0)
    // const history = useHistory()

    useEffect(() => {
    }, [])
    const useStyles = makeStyles((theme) => ({

        spinOn: {
            animation: `$spin 5000ms ${theme.transitions.easing.easeInOut}`
        },
        '@keyframes spin': {
            '60%': {
                transform: 'rotate(' + deg + 'deg)',
            },
            '100%': {
                transform: 'rotate(' + deg + 'deg)',
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
        },
        spinContainer: {
            textAlign: 'center',
            display: 'flex',
            position: 'relative',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            [theme.breakpoints.down('sm')]: {
                top: 40,
            },
            [theme.breakpoints.down('xs')]: {
                top: 300,
                left: -90
            }
        },
        bloquinho: {
            [theme.breakpoints.only('sm')]: {
                display: 'none'
            }
        }

    }))


    const [open, setOpen] = React.useState(false);
    const [assunto, setAssunto] = useState(null)
    const [headerColor, setHeaderColor] = useState(assunto === 'Seleção' ? colors.yellow : assunto === 'Sequência' ? colors.red : assunto === 'Repetição' ? colors.green : colors.blue)

    const propsStyle = { backgroundColor: headerColor };
    const classes = useStyles(propsStyle)

    let styles = {
        container: {
            backgroundColor: headerColor
        }
    }

    const StyledDialog = withStyles(styles)((props) => <Dialog PaperProps={{
        style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
        },
    }}{...props} />)

    useEffect(() => {
        styles.container.backgroundColor = headerColor
    }, [])

    const startSpin = (j) => {
        setTimeout(() => {
            var s = -(j * j) + 50 * j

            if (j === 25) {
                toggleSpin(false)
                setOpen(true)
                calculaResultado()
                

                return true
            }


            changeDeg(deg + s)
            startSpin(j + 0.5)
        }, 50)
    }

    const setSpin = () => {
        toggleSpin(true)
        startSpin(i)
    }

    const calculaResultado = () => {
        const assuntos = ['Repetição', 'Seleção', 'Sequência']
        setAssunto(assuntos[Math.round(2 * Math.random())])
        const assuntoAux = assuntos[Math.round(2 * Math.random())]
        const color = assuntoAux === 'Seleção' ? colors.yellow : assuntoAux === 'Sequência' ? colors.red : assuntoAux === 'Repetição' ? colors.green : colors.blue
        document.body.getElementsByClassName('MuiDialog-container')[0].style.backgroundColor=color
        return assunto
    }

    return (
        <Grid container
            style={{
                display: 'flex',
                height: '100%'
            }}>
            <Grid item sm={12} md={8} style={{ paddingBottom: 10 }}>
                <Grid item sm={12}
                    className={classes.spinContainer}>
                    {/* <ArrowDropDownIcon className={classes.arrow}/> */}
                    {/* <img src={Right} className={clsx(classes.spin, {
                        [classes.spinOn]: spin
                    })} /> */}
                    <img src={require('./SpinCircle.svg')}
                        style={{
                            height: 200 * 0.715,
                            position: 'absolute',
                            top: 6,
                            left: 6,

                            transform: 'rotate(' + deg + 'deg)'
                        }} />
                    <img src={require('./SpinOut.svg')}

                        style={{
                            height: 200,
                            position: 'absolute',
                            top: 0
                        }} />
                    <img src={require('./SpinBloquinho.svg')}
                        className={classes.bloquinho}
                        style={{
                            height: 200,
                            position: 'absolute',
                            top: 0,
                            left: 150,
                        }} />

                    <SpinButton size="medium"
                        style={{
                            position: 'relative',
                            top: 210,
                            left: 25,
                        }}
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            if (!spin) {
                                setSpin()
                            }

                        }}
                    >Girar</SpinButton>
                </Grid>
                <StyledDialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => { setOpen(false) }}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    fullWidth
                    maxWidth='md'
                >
                    <DialogTitle id="customized-dialog-title"
                        onClose={() => { setOpen(false) }}
                        style={{
                            color: '#ffffff'
                        }}>E o assunto escolhido foi...</DialogTitle>

                    <div style={{
                        backgroundColor: '#ffffff',
                        borderRadius: 7,
                        padding: '50px 30px'
                    }}>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                <Grid container>
                                    <Grid item sm={6} style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        textAlign: 'center'
                                    }}>
                                        <div style={{
                                            fontSize: 27,
                                            fontWeight: 800,
                                            color: colors.black
                                        }}>{assunto}</div>
                                        <div style={{
                                            fontSize: 14,
                                            color: colors.black
                                        }}> 5 questões</div>

                                    </Grid>
                                    <Grid item sm={6}>
                                        <GraficoQuiz assunto={assunto}/>
                                        <div>Seu desempenho em <b>{assunto}</b></div>
                                    </Grid>
                                    <Grid item sm={12} style={{ textAlign: "center" }}>
                                        <Button variant="contained"
                                            onClick={(e) => {history.push('/quiz/responder', { assunto: assunto })}}
                                            style={{
                                                backgroundColor: colors.blue,
                                                padding: '10px 40px',
                                                color: 'white',
                                                margin: '0',
                                                fontSize: 16,
                                                marginTop: 30,
                                                fontWeight: 500,
                                                letterSpacing: 1.3
                                            }}>Vamos lá!</Button>
                                    </Grid>
                                </Grid>
                            </DialogContentText>
                        </DialogContent>
                    </div>
                </StyledDialog>

            </Grid>
        </Grid>
    )
}