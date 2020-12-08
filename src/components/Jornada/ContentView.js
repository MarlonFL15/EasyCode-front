import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles, createStyles } from '@material-ui/core/styles';
import { Button, Card, CardMedia, Grid, Typography } from '@material-ui/core';

import colors from './../Colors'
import SubjectIcon from '@material-ui/icons/Subject';
import ExtensionIcon from '@material-ui/icons/Extension';
import AssignmentIcon from '@material-ui/icons/Assignment';
import clsx from "clsx";
import GraficoSubmissoes from '../Dashboard/GraficoSubmissoes';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => createStyles({
    table: {
    },
    root: {
        overflowX: 'hidden',
        width: '100%',
        minHeight: 600,
        display: 'flex',
        flexDirection: 'column',
        padding: 25
    },
    title: {
        fontFamily: 'Poppins, sans-serif',
        fontSize: 24,
        marginTop: 100,
        color: '#FFFFFf',
        marginBottom: 30,

    },
    barClosed: {
        height: 68,
        overflow: 'hidden',
        transition: theme.transitions.create(['height'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.up('md')]: {
            height: '100%',
        }
    },
    barOpen: {
        height: '100%',
        transition: theme.transitions.create('height', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),

    },
}));

export default function ContentView() {
    const [barOpen, setBarOpen] = React.useState(false)
    const classes = useStyles();

    const themes = ['Sequência', 'Seleção', 'Repetição']
    const aula = [
        'Texto',
        'Quiz',
        'Quiz',
        'Blocos',
        'Texto',
        'Texto',
        'Texto'
    ]
    const [ondeParou, setOndeParou] = useState(5)
    const texto = '<b>oi</b> ooi'
    const history = useHistory()
    return (
        <div className={classes.root}>
            <div className="top" style={{ padding: 7, background: colors.blue, width: '100%', position: 'absolute', top: 0, left: 0, zIndex: -1, height: 300 }} />

            <h2 className={classes.title}>Vamos aprender sobre seleção?</h2>

            <Grid container spacing={2}>
                <Grid item xs={12} md={4} >
                    <Card style={{ border: 'none', padding: 20, position: 'relative'}} variant='outlined'
                        onClick={() => setBarOpen(!barOpen)}
                        className={clsx({
                            [classes.barOpen]: barOpen,
                            [classes.barClosed]: !barOpen,
                        })}>
                        <h3>Conteúdo <br /></h3>
                        {aula.map((item, i) => {
                            return (
                                <div
                                    style={{
                                        display: 'flex',
                                        margin: '20px 0',
                                    }}
                                    onClick={() => setOndeParou(i)}>
                                    <div
                                        id={'order_' + i}
                                        style={{
                                            backgroundColor: ondeParou >= i ? colors.green : colors.background,
                                            width: 25,
                                            textAlign: 'center',
                                            height: 25,
                                            borderRadius: '100%',
                                            zIndex: 2,
                                            color: ondeParou >= i ? '#ffffff' : colors.black,
                                            marginRight: 10
                                        }}>{i + 1}</div>
                                    {item === 'Texto' ?
                                        <SubjectIcon /> :
                                        item === 'Quiz' ?
                                            <AssignmentIcon /> :
                                            <ExtensionIcon />}
                                    <div style={{ marginLeft: 7 }}>
                                        {item}
                                    </div>
                                </div>
                            )
                        })}
                        <div style={{ position: 'absolute', width: 10, height: 45 * (aula.length - 1), top: 78, left: 27, backgroundColor: 'lightgray' }}></div>
                        <div style={{ position: 'absolute', width: 10, height: 45 * ondeParou, top: 78, left: 27, backgroundColor: colors.green }}></div>

                    </Card>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Card style={{ height: '100%', border: 'none', minHeight: 400}} variant='outlined'>
                        {aula[ondeParou] === 'Quiz' ?
                            <div>
                                <div style={{
                                    backgroundColor: '#ffffff',
                                    borderRadius: 7,
                                    padding: '50px 30px'
                                }}>
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
                                            }}>If e else</div>
                                            <div style={{
                                                fontSize: 18,
                                                // fontWeight: 600,
                                                color: colors.black
                                            }}>Quiz</div>
                                            <div style={{
                                                fontSize: 14,
                                                color: colors.black
                                            }}> 5 questões</div>

                                        </Grid>
                                        <Grid item sm={6}>
                                            <GraficoSubmissoes />
                                            <div>Seu desempenho em <b>If e else</b></div>
                                        </Grid>
                                        <Grid item sm={12} style={{ textAlign: "center" }}>
                                            <Button variant="contained"
                                                style={{
                                                    backgroundColor: colors.blue,
                                                    padding: '10px 40px',
                                                    color: 'white',
                                                    margin: '0',
                                                    fontSize: 16,
                                                    marginTop: 30,
                                                    fontWeight: 500,
                                                    letterSpacing: 1.3
                                                }}
                                                onClick={()=>{history.push({
                                                    pathname: '/quiz/responder',
                                                    state: { assunto: 'Seleção', jornada:true}})}}>Vamos lá!</Button>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div> :
                            aula[ondeParou] === 'Blocos' ?

                                <div style={{
                                    backgroundColor: '#ffffff',
                                    borderRadius: 7,
                                    height: '100%',
                                    padding: '50px 30px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                }}>
                                    <Grid container>
                                        <Grid item xs={12} style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            textAlign: 'center',

                                        }}>
                                            <div style={{
                                                fontSize: 27,
                                                fontWeight: 800,
                                                color: colors.black
                                            }}>Olá mundo</div>
                                            <div style={{
                                                fontSize: 18,
                                                // fontWeight: 600,
                                                color: colors.black
                                            }}>Blocos</div>
                                            <div style={{
                                                fontSize: 14,
                                                color: colors.black
                                            }}>Difícil</div>

                                        </Grid>
                                        <Grid item sm={12} style={{ textAlign: "center" }}>
                                            <Button variant="contained"
                                                style={{
                                                    backgroundColor: colors.blue,
                                                    padding: '10px 40px',
                                                    color: 'white',
                                                    margin: '0',
                                                    fontSize: 16,
                                                    marginTop: 30,
                                                    fontWeight: 500,
                                                    letterSpacing: 1.3
                                                }}
                                                onClick={()=>{history.push({
                                                    pathname: '/questao',
                                                    state: { id: 2 }})}}>Vamos lá!</Button>
                                        </Grid>
                                    </Grid>
                                </div>
                                :
                                <div style={{padding: 30}}>
                                    <h1>Titulo</h1>
                                    <div dangerouslySetInnerHTML={{__html: texto}} />
                                </div>}
                    </Card>
                </Grid>

            </Grid>
        </div>
    );
}
