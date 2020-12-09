import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles, createStyles } from '@material-ui/core/styles';
import { Button, Card, CardMedia, Grid, Typography } from '@material-ui/core';

import colors from './../Colors'
import SubjectIcon from '@material-ui/icons/Subject';
import ExtensionIcon from '@material-ui/icons/Extension';
import AssignmentIcon from '@material-ui/icons/Assignment';
import clsx from "clsx";
import GraficoSubmissoes from '../Dashboard/GraficoSubmissoes';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import conteudo from '../conteudo';
import GraficoQuiz from '../Quiz/GraficoQuiz';

const useStyles = makeStyles((theme) => createStyles({
    table: {
    },
    root: {
        // overflowX: 'hidden',
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
    buttonRow: {
        justifyContent: 'space-between',

        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
            textAlign: 'center'
        }
    },
    buttonRowRight: {
        justifyContent: 'flex-end',
        textAlign: 'end',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
            textAlign: 'center'
        }
    },
    gridContainer: {
        [theme.breakpoints.down('sm')]: {
        }
    }
}));


export default function ContentView() {
    const [barOpen, setBarOpen] = React.useState(false)
    const [texto, setTexto] = React.useState('<div>oi</div>')
    let { tema } = useParams()
    const classes = useStyles();
    const location = useLocation()
    const themes = ['sequência', 'seleção', 'repetição']
    const assunto = tema === 'sequencia' ? 0 : tema === 'selecao' ? 1 : 2

    // if (location.state.quiz) {
    //     const onde = 
    //     if (onde != ondeParou)
    //         setOndeParou(onde)
    // }
    const [ondeParou, setOndeParou] = useState(location.state ? location.state.quiz.ondeParou : 0)
    // const texto = '<b>oi</b> ooi'
    const history = useHistory()

    function printConteudo(titulo, texto) {
        const conteudoHMTML = <di dangerouslySetInnerHTML={{ __html: '' }} />
        conteudoHMTML.props.dangerouslySetInnerHTML.__html = texto

        console.log(conteudoHMTML)
        return <div style={{ padding: 30 }}>
            <h1>{titulo}</h1>
            {conteudoHMTML}
        </div>
    }

    function resultadoQuiz() {
        const { quiz } = location.state
        const assunto = location.state.quiz.assunto
        const qtdQuestoes = quiz.questoes
        const acertos = quiz.acertos
        const resultado = acertos / qtdQuestoes * 100
        var stars = [false, false, false]

        if (resultado !== 0) stars[0] = true
        if (resultado > 50) stars[1] = true
        if (resultado === 100) stars[2] = true

        // const classes = useStyles()
        return (
            <Grid container style={{ height: '100%', padding: 20, position: 'relative' }}>
                <img style={{
                    display: 'block',
                    width: 150, height: 270,
                    margin: '0 auto',

                    zIndex: 2,
                    marginTop: -130, marginBottom: 0
                }} src={require('../Quiz/ResultOver50.svg')} />


                <Grid container item sm={12}>
                    <Grid xs={12} item md={6} style={{ margin: 'auto', textAlign: 'center', paddingBottom: 50 }}>

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {stars.map((item, i) =>
                                <img
                                    style={{
                                        width: i === 1 ? 60 : 40,
                                        marginTop: 'auto'
                                    }}
                                    src={require(item ? '../Quiz/StarFull.svg' : '../Quiz/StarDisabled.svg')} />)}
                        </div>
                        <div
                            style={{
                                fontSize: 25,
                                fontWeight: 600,
                            }}>Você acertou {acertos} das {qtdQuestoes} questões</div>
                        <div>Continue assim!</div>

                    </Grid>

                    <Grid item xs={12} md={6} style={{ height: '100%', padding: '50px 0', display: 'flex' }}>
                        <div style={{ width: '100%', maxWidth: 500, margin: '0 auto' }}>
                            <GraficoQuiz assunto={assunto} />

                        </div>
                    </Grid>
                </Grid>

                <Grid container item xs={12} className={classes.buttonRow} style={{ marginTop: 'auto' }}>
                    <Grid item xs={12} md={2}>
                        <Button variant="contained"
                            onClick={(e) => history.push({
                                pathname: '/quiz/responder',
                                state: { assunto: quiz.assunto, jornada: true, ondeParou }
                            })}
                            style={{
                                border: '3px solid ' + colors.blue,
                                padding: '10px 40px',
                                background: 'transparent',
                                color: colors.blue,
                                fontSize: 16,
                                fontWeight: 600,
                                letterSpacing: 1.3,
                            }}>Refazer</Button>
                    </Grid>


                    <Grid container item xs={12} md={10} className={classes.buttonRowRight}>
                        <Grid item xs={12} md={6} >

                            <Button
                                onClick={(e) => history.push('/dashboard')}
                                style={{
                                    padding: '10px 40px',
                                    background: 'transparent',
                                    color: colors.blue,
                                    fontSize: 16,
                                    fontWeight: 600,
                                    letterSpacing: 1.3,
                                }}>Voltar para o menu</Button>

                        </Grid>
                        <Grid item style={{ textAlign: 'end' }}>

                            <Button variant="contained"
                                style={{
                                    backgroundColor: colors.blue,
                                    padding: '10px 40px',
                                    color: 'white',
                                    margin: '0',
                                    fontSize: 16,
                                    fontWeight: 500,
                                    letterSpacing: 1.3
                                }} 
                                onClick={()=>{setOndeParou(ondeParou+1)}}>PRÓXIMO</Button>
                        </Grid>

                    </Grid>

                </Grid>
            </Grid>
        )
    }

    if (tema === 'sequencia' || tema === 'repeticao' || tema === 'selecao')
        return (
            <div className={classes.root}>
                <div className="top" style={{ padding: 7, background: colors.blue, width: '100%', position: 'absolute', top: 0, left: 0, zIndex: -1, height: 300 }} />

                <h2 className={classes.title}>Vamos aprender sobre {themes[assunto]}?</h2>

                <Grid container spacing={2} className={classes.gridContainer}>
                    <Grid item xs={12} md={4} >
                        <Card style={{ border: 'none', padding: 20, position: 'relative' }} variant='outlined'
                            onClick={() => setBarOpen(!barOpen)}
                            className={clsx({
                                [classes.barOpen]: barOpen,
                                [classes.barClosed]: !barOpen,
                            })}>
                            <h3>Conteúdo <br /></h3>
                            {conteudo[assunto].aulas.map((item, i) => {
                                return (
                                    <div
                                        style={{
                                            display: 'flex',
                                            margin: '20px 0',
                                        }}
                                        onClick={() => {
                                            setOndeParou(i)
                                            setTexto(conteudo[assunto].aulas[i].conteudo)
                                            console.log(texto)
                                        }}>
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
                                        {item.tipo === 'Texto' ?
                                            <SubjectIcon /> :
                                            item.tipo === 'Quiz' ?
                                                <AssignmentIcon /> :
                                                <ExtensionIcon />}
                                        <div style={{ marginLeft: 7 }}>
                                            {item.titulo ? item.titulo : item.tipo}
                                        </div>
                                    </div>
                                )
                            })}
                            <div style={{ position: 'absolute', width: 10, height: 45 * (conteudo[assunto].aulas.length - 1), top: 78, left: 27, backgroundColor: 'lightgray' }}></div>
                            <div style={{ position: 'absolute', width: 10, height: 45 * ondeParou, top: 78, left: 27, backgroundColor: colors.green }}></div>

                        </Card>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Card style={{ height: '100%', border: 'none', minHeight: 400, overflow: 'visible' }} variant='outlined'>
                            {conteudo[assunto].aulas[ondeParou].tipo === 'Quiz' ?
                                location.state ?
                                    resultadoQuiz()
                                    :
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
                                                    }}>{themes[assunto][0].toLocaleUpperCase()+themes[assunto].substring(1)}</div>
                                                 
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
                                                        onClick={() => {
                                                            history.push({
                                                                pathname: '/quiz/responder',
                                                                state: { assunto: themes[assunto], jornada: true, ondeParou }
                                                            })
                                                        }}>Vamos lá!</Button>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div> :
                                conteudo[assunto].aulas[ondeParou].tipo === 'Blocos' ?

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
                                                    onClick={() => {
                                                        history.push({
                                                            pathname: '/questao',
                                                            state: { id: 2 }
                                                        })
                                                    }}>Vamos lá!</Button>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    : printConteudo(conteudo[assunto].aulas[ondeParou].titulo, texto)}
                        </Card>
                    </Grid>

                </Grid>
            </div>
        );
    else
        return <div>nao existe</div>
}
